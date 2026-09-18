import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import { categoryFromLineSlug } from './productLineCatalog.js';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const DEFAULT_PER_PAGE = 12;
const PER_PAGE_OPTIONS = [9, 12, 18, 24];
const BRAND_KEYWORDS = [
  'Toyota',
  'Isuzu',
  'Mitsubishi',
  'Nissan',
  'Mazda',
  'Suzuki',
  'Mercedes-Benz',
  'Scania',
  'Hino',
  'Tata',
  'Renault',
  'Ford',
  'Lexus',
  'Subaru',
  'Daihatsu',
  'Komatsu',
  'Volvo',
  'DAF',
];

function productImageSrc(base, path) {
  if (!path) return `${base}/images/logo.png`;
  const p = String(path);
  if (p.startsWith('http')) return p;
  if (p.startsWith('uploads/')) return `${base}/backend-php/${p}`;
  return `${base}/${p}`;
}

function extractBrand(product) {
  const haystack = [product.name, product.description, product.applications, product.specifications]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  const matched = BRAND_KEYWORDS.find((brand) => haystack.includes(brand.toLowerCase()));
  return matched || 'Other';
}

const ProductLinePage = () => {
  const navigate = useNavigate();
  const { lineSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = useMemo(() => categoryFromLineSlug(lineSlug || ''), [lineSlug]);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const requestedPerPage = parseInt(searchParams.get('per_page') || String(DEFAULT_PER_PAGE), 10);
  const perPage = PER_PAGE_OPTIONS.includes(requestedPerPage) ? requestedPerPage : DEFAULT_PER_PAGE;

  const base = publicUrl();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    if (!category) return undefined;
    let cancelled = false;
    setLoading(true);
    setError('');
    const qs = new URLSearchParams({
      category,
      page: String(page),
      per_page: String(perPage),
    });
    const url = `${base}/backend-php/api/products.php?${qs.toString()}`;
    fetch(url)
      .then(async (r) => {
        const text = await r.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          const snippet = text.slice(0, 120).replace(/\s+/g, ' ');
          throw new Error(
            r.ok
              ? `Invalid response from server (${snippet || 'empty'})`
              : `Request failed (${r.status}). ${snippet || 'No details'}`
          );
        }
        if (!r.ok) {
          throw new Error(data.error || `Request failed (${r.status})`);
        }
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        if (!data.success) {
          setError(data.error || 'Failed to load products');
          setProducts([]);
          setTotal(0);
          setTotalPages(0);
          return;
        }
        setProducts(data.products || []);
        setTotal(typeof data.total === 'number' ? data.total : 0);
        setTotalPages(typeof data.total_pages === 'number' ? data.total_pages : 0);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || 'Failed to load products');
          setProducts([]);
          setTotal(0);
          setTotalPages(0);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [base, category, page, perPage]);

  if (!category) {
    return <Navigate to=".." replace relative="path" />;
  }

  const goPage = (next) => {
    const clamped = Math.max(1, Math.min(next, Math.max(1, totalPages)));
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (clamped <= 1) params.delete('page');
      else params.set('page', String(clamped));
      if (perPage === DEFAULT_PER_PAGE) params.delete('per_page');
      else params.set('per_page', String(perPage));
      return params;
    });
  };

  const changePerPage = (nextPerPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete('page');
      if (nextPerPage === DEFAULT_PER_PAGE) params.delete('per_page');
      else params.set('per_page', String(nextPerPage));
      return params;
    });
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  const clearFilters = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setSelectedBrands([]);
  };

  const parsedMinPrice = minPriceInput === '' ? null : Number(minPriceInput);
  const parsedMaxPrice = maxPriceInput === '' ? null : Number(maxPriceInput);

  const brandCounts = useMemo(() => {
    const counts = new Map();
    products.forEach((p) => {
      const brand = extractBrand(p);
      counts.set(brand, (counts.get(brand) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([brand, count]) => ({ brand, count }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = Number(p.price);
      const brand = extractBrand(p);
      const withinMin = parsedMinPrice == null || (!Number.isNaN(price) && price >= parsedMinPrice);
      const withinMax = parsedMaxPrice == null || (!Number.isNaN(price) && price <= parsedMaxPrice);
      const withinBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
      return withinMin && withinMax && withinBrand;
    });
  }, [products, parsedMinPrice, parsedMaxPrice, selectedBrands]);

  const displayedProducts = useMemo(() => {
    const next = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        next.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        next.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name-asc':
        next.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
        break;
      case 'code-asc':
        next.sort((a, b) => String(a.code || '').localeCompare(String(b.code || '')));
        break;
      default:
        break;
    }
    return next;
  }, [filteredProducts, sortBy]);

  return (
    <div className="amazon-product-line-page min-h-screen">
      <div className="border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link
            to=".."
            relative="path"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            Back to product lines
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">{category}</h1>
          <p className="mt-3 text-zinc-600 max-w-2xl leading-relaxed">
            Catalogue items in this line, factory programmes and cross-references. Use pagination to browse the full
            list.
          </p>
          {total > 0 ? (
            <p className="mt-2 text-sm text-zinc-500">
              Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} products
            </p>
          ) : null}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 py-12">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-zinc-600 py-16">
            No catalogue items in this line yet. Please check back or{' '}
            <Link to="../../contact" relative="path" className="text-sky-600 hover:text-sky-800 font-medium">
              contact us
            </Link>{' '}
            for availability.
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <aside
              className="amazon-pl-filter-panel w-full rounded-2xl p-5 h-fit md:sticky md:top-24 md:flex-none"
              style={{ flexBasis: '12.5%' }}
            >
              <div className="space-y-8">
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-700">Filter By Price</h3>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <label className="text-xs text-zinc-600">
                      Min
                      <input
                        type="number"
                        min="0"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                        className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900"
                        placeholder="0"
                      />
                    </label>
                    <label className="text-xs text-zinc-600">
                      Max
                      <input
                        type="number"
                        min="0"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                        className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900"
                        placeholder="20000"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-zinc-600">
                    Price:{' '}
                    <span className="text-zinc-900 font-medium">
                      KSh {parsedMinPrice == null ? '0' : parsedMinPrice.toLocaleString()} -{' '}
                      {parsedMaxPrice == null ? 'Any' : `KSh ${parsedMaxPrice.toLocaleString()}`}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-md border border-zinc-300 bg-zinc-50 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400"
                  >
                    CLEAR
                  </button>
                </section>

                <section className="border-t border-zinc-200 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-700">Filter By Brand</h3>
                  <label className="mt-4 flex items-center justify-between text-zinc-600 text-sm cursor-pointer">
                    <span className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.length === 0}
                        onChange={() => setSelectedBrands([])}
                        className="h-4 w-4 rounded border-zinc-300 text-sky-600"
                      />
                      All
                    </span>
                    <span>({products.length})</span>
                  </label>
                  {brandCounts.map(({ brand, count }) => (
                    <label key={brand} className="mt-3 flex items-center justify-between text-zinc-600 text-sm cursor-pointer">
                      <span className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="h-4 w-4 rounded border-zinc-300 text-sky-600"
                        />
                        {brand}
                      </span>
                      <span>({count})</span>
                    </label>
                  ))}
                </section>

                <section className="border-t border-zinc-200 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-700">Product Tags</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-zinc-700">11 KVA</span>
                    <span className="text-xs rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-zinc-700">150 KVA</span>
                    <span className="text-xs rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-zinc-700">500 KVA</span>
                  </div>
                </section>
              </div>
            </aside>

            <section className="w-full md:flex-1" style={{ flexBasis: '87.5%' }}>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 sm:px-5 py-4 mb-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-zinc-900">{category}</h2>
                    <span className="text-sm text-zinc-500 hidden sm:inline">{total} items</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <span className="font-medium text-zinc-800">Show:</span>
                      {PER_PAGE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => changePerPage(opt)}
                          className={`transition-colors ${perPage === opt ? 'text-sky-600 font-semibold' : 'text-zinc-500 hover:text-zinc-800'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="inline-flex items-center rounded-md border border-zinc-200 overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setView('list')}
                        className={`p-2 ${view === 'list' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'}`}
                        aria-label="List view"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setView('grid')}
                        className={`p-2 border-l border-zinc-200 ${view === 'grid' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'}`}
                        aria-label="Grid view"
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </button>
                    </div>
                    <label className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300">
                      <SlidersHorizontal className="w-4 h-4" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent text-sm outline-none"
                        aria-label="Sort products"
                      >
                        <option value="default">Default sorting</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="name-asc">Name: A-Z</option>
                        <option value="code-asc">Code: A-Z</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <ul
                className={`list-none p-0 m-0 ${
                  view === 'grid'
                    ? 'flex flex-wrap gap-3 items-stretch'
                    : 'flex flex-col gap-3 items-stretch'
                }`}
              >
                {displayedProducts.map((p) => {
                  const rawDesc = p.description != null ? String(p.description).trim() : '';
                  const descLong = rawDesc.length > 20;
                  const descPreview = descLong ? `${rawDesc.slice(0, 20)}…` : rawDesc;
                  const detailTo = `/products/${p.id}`;
                  return (
                  <li
                    key={p.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(detailTo)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(detailTo);
                      }
                    }}
                    className={`amazon-product-line-card h-full flex rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white shrink-0 ${
                      view === 'list' ? 'amazon-pl-card--list flex-col sm:flex-row' : 'amazon-pl-card--grid flex-col'
                    }`}
                  >
                    <div className="amazon-pl-card-media">
                      <img
                        src={productImageSrc(base, p.image)}
                        alt={p.name || p.code}
                        className="amazon-pl-card-img"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${base}/images/logo.png`;
                        }}
                      />
                    </div>
                    <div className="amazon-pl-card-body p-2 flex flex-col flex-1 min-h-0 min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-sky-700 leading-tight">{p.code}</p>
                      <h3 className="text-xs font-semibold text-zinc-900 mt-0.5 leading-tight line-clamp-2">{p.name}</h3>
                      <div className="amazon-pl-card-desc-slot mt-1 text-[11px] text-zinc-600 leading-snug">
                        {rawDesc ? (
                          <p className="m-0">
                            {descLong ? descPreview : rawDesc}
                            {descLong ? (
                              <>
                                {' '}
                                <Link
                                  to={detailTo}
                                  className="text-sky-600 hover:text-sky-800 font-medium whitespace-nowrap"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Read more
                                </Link>
                              </>
                            ) : null}
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-auto pt-1 text-xs text-zinc-900 font-semibold">
                        KES {Number(p.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </li>
                  );
                })}
              </ul>

              {!loading && !error && products.length > 0 && displayedProducts.length === 0 ? (
                <p className="text-center text-zinc-600 py-10">No products match the selected filters.</p>
              ) : null}

              {totalPages > 1 ? (
                <nav className="mt-12 flex flex-wrap items-center justify-center gap-3" aria-label="Product list pagination">
                  <button
                    type="button"
                    onClick={() => goPage(page - 1)}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 disabled:opacity-35 disabled:pointer-events-none hover:bg-zinc-50 hover:border-zinc-400"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="text-sm text-zinc-500 px-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => goPage(page + 1)}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 disabled:opacity-35 disabled:pointer-events-none hover:bg-zinc-50 hover:border-zinc-400"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              ) : null}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductLinePage;
