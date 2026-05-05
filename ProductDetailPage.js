import React, { useEffect, useState, useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Package,
  Banknote,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
  Plus,
  X
} from 'lucide-react';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

function productImageSrc(base, path) {
  if (!path) return `${base}/images/logo.png`;
  const p = String(path);
  if (p.startsWith('http')) return p;
  if (p.startsWith('uploads/')) return `${base}/backend-php/${p}`;
  return `${base}/${p}`;
}

function formatPriceKes(price) {
  const n = Number(price);
  if (Number.isNaN(n)) return '0';
  return n.toLocaleString('en-KE', { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

function shareUrl() {
  if (typeof window === 'undefined') return '';
  return encodeURIComponent(window.location.href);
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const base = publicUrl();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderFormError, setOrderFormError] = useState('');
  const [orderToast, setOrderToast] = useState(null);

  const idOk = productId && /^\d+$/.test(String(productId));

  useEffect(() => {
    if (!idOk) return undefined;
    let cancelled = false;
    setLoading(true);
    setError('');
    const url = `${base}/backend-php/api/products.php?id=${encodeURIComponent(productId)}`;
    fetch(url)
      .then(async (r) => {
        const text = await r.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          const snippet = text.slice(0, 120).replace(/\s+/g, ' ');
          throw new Error(
            r.ok ? `Invalid response (${snippet || 'empty'})` : `Request failed (${r.status}). ${snippet || ''}`
          );
        }
        if (!r.ok) throw new Error(data.error || `Request failed (${r.status})`);
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        if (!data.success || !data.product) {
          setError(data.error || 'Product not found');
          setProduct(null);
          return;
        }
        setProduct(data.product);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || 'Failed to load product');
          setProduct(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [base, productId, idOk]);

  useEffect(() => {
    if (!product) {
      setRelated([]);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      try {
        const cat = product.category || '';
        const r1 = await fetch(`${base}/backend-php/api/products.php?category=${encodeURIComponent(cat)}&per_page=16`);
        const d1 = await r1.json();
        let list = [];
        if (d1.success && Array.isArray(d1.products)) {
          list = d1.products.filter((p) => String(p.id) !== String(product.id));
        }
        if (list.length < 4) {
          const r2 = await fetch(`${base}/backend-php/api/products.php`);
          const d2 = await r2.json();
          if (d2.success && Array.isArray(d2.products)) {
            const seen = new Set(list.map((p) => p.id));
            for (const p of d2.products) {
              if (list.length >= 4) break;
              if (String(p.id) === String(product.id) || seen.has(p.id)) continue;
              list.push(p);
              seen.add(p.id);
            }
          }
        }
        if (!cancelled) setRelated(list.slice(0, 4));
      } catch {
        if (!cancelled) setRelated([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [product, base]);

  useEffect(() => {
    if (!orderModalOpen) return undefined;
    setOrderFormError('');
    const onKey = (e) => {
      if (e.key === 'Escape') setOrderModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [orderModalOpen]);

  const tagList = useMemo(() => {
    if (!product) return [];
    const raw = [product.category, product.code, product.name].filter(Boolean);
    const seen = new Set();
    const out = [];
    for (const t of raw) {
      const s = String(t).trim();
      if (s && !seen.has(s.toLowerCase())) {
        seen.add(s.toLowerCase());
        out.push(s);
      }
    }
    return out;
  }, [product]);

  const waOrderHref = useMemo(() => {
    if (!product) return 'https://wa.me/254714752613';
    const text = `Hello Amazon Filtration — I would like to order: ${product.code} (${product.name}). Quantity: ${qty}.`;
    return `https://wa.me/254714752613?text=${encodeURIComponent(text)}`;
  }, [product, qty]);

  const submitProductOrder = async (e) => {
    e.preventDefault();
    if (!product) return;
    setOrderFormError('');
    setOrderSubmitting(true);
    const url = `${base}/backend-php/api/product-order.php`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: orderName.trim(),
          email: orderEmail.trim(),
          productId: Number(product.id),
          quantity: qty,
        }),
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        const snippet = text.slice(0, 120).replace(/\s+/g, ' ');
        throw new Error(
          res.ok
            ? `Invalid response (${snippet || 'empty'})`
            : `Request failed (${res.status}). ${snippet || ''}`
        );
      }
      if (!res.ok || !data.success) {
        throw new Error(data.error || `Request failed (${res.status}).`);
      }
      setOrderModalOpen(false);
      setOrderName('');
      setOrderEmail('');
      setOrderToast({
        type: 'success',
        text: 'Your order details were emailed to you and to our team.',
      });
      window.setTimeout(() => {
        setOrderToast(null);
        navigate('/');
      }, 2800);
    } catch (err) {
      setOrderFormError(err.message || 'Could not send your order. Please try again or call +254 714 752 613.');
    } finally {
      setOrderSubmitting(false);
    }
  };

  if (!idOk) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="amazon-product-detail-page min-h-screen bg-white text-gray-900 relative">
      {orderToast ? (
        <div
          className={`amazon-pd-order-toast fixed left-1/2 top-4 z-[60] max-w-md -translate-x-1/2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
            orderToast.type === 'success'
              ? 'bg-emerald-800 text-white'
              : 'bg-red-700 text-white'
          }`}
          role="status"
        >
          {orderToast.text}
        </div>
      ) : null}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-20">
        <Link
          to=".."
          relative="path"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          Back to products
        </Link>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          </div>
        ) : error ? (
          <p className="mt-10 text-red-600">{error}</p>
        ) : product ? (
          <>
            <div className="amazon-pd-main-grid mt-8 items-start">
              <div className="amazon-pd-image-wrap rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center p-6 sm:p-10">
                <img
                  src={productImageSrc(base, product.image)}
                  alt={product.name || product.code}
                  className="amazon-pd-hero-img w-full max-w-lg object-contain"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${base}/images/logo.png`;
                  }}
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">{product.code}</h1>
                {product.name && product.name !== product.code ? (
                  <p className="mt-1 text-lg text-gray-700">{product.name}</p>
                ) : null}

                <p className="mt-6 text-2xl sm:text-3xl font-bold text-black">
                  {formatPriceKes(product.price)}/=
                </p>
                <p className="mt-1 text-sm text-gray-600">(Inclusive VAT)</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <label htmlFor="pd-qty" className="sr-only">
                    Quantity
                  </label>
                  <input
                    id="pd-qty"
                    type="number"
                    min={1}
                    max={999}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
                    className="amazon-pd-qty w-16 rounded border border-gray-300 bg-gray-100 px-2 py-2 text-center text-sm font-semibold text-gray-900"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(true)}
                    className="amazon-pd-btn-primary inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white sm:flex-none border-0 cursor-pointer"
                  >
                    <Package className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    Place order
                  </button>
                  <a
                    href="tel:+254714752613"
                    className="amazon-pd-btn-primary inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white sm:flex-none"
                  >
                    <Phone className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    To order
                  </a>
                  <a
                    href={waOrderHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-pd-btn-wa inline-flex flex-1 min-w-[160px] items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white sm:flex-none"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    To order
                  </a>
                </div>

                <div className="mt-4">
                  <Link
                    to="/contact?service=quote"
                    className="amazon-pd-btn-primary inline-flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white"
                  >
                    <Banknote className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                    Need financing?
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-pd-social"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-pd-social"
                    aria-label="Share on X"
                  >
                    <Twitter className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-pd-social"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${shareUrl()}&description=${encodeURIComponent(product.code || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-pd-social"
                    aria-label="Share on Pinterest"
                  >
                    <Share2 className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <a href={waOrderHref} target="_blank" rel="noopener noreferrer" className="amazon-pd-social" aria-label="WhatsApp">
                    <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  </a>
                  <button type="button" className="amazon-pd-social" aria-label="More share options" onClick={() => navigator.clipboard?.writeText?.(window.location.href)}>
                    <Plus className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-10 space-y-2 text-sm text-black">
                  <p>
                    <span className="font-semibold">SKU:</span> {product.code}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{' '}
                    <span className="amazon-pd-accent font-medium">{product.category}</span>
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Tags:</span>{' '}
                    {tagList.map((t, i) => (
                      <span key={t}>
                        {i > 0 ? <span className="text-gray-800">, </span> : null}
                        <span className="amazon-pd-accent font-medium">{t}</span>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {product.description ? (
              <section className="mt-16 sm:mt-20 max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-black">Description</h2>
                <p className="mt-4 text-base text-gray-800 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </section>
            ) : null}

            {product.specifications ? (
              <section className="mt-12 max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-black">Specifications</h2>
                <p className="mt-4 text-base text-gray-800 leading-relaxed whitespace-pre-wrap">{product.specifications}</p>
              </section>
            ) : null}

            {related.length > 0 ? (
              <section className="mt-16 sm:mt-20">
                <h2 className="text-2xl sm:text-3xl font-bold text-black">Related products</h2>
                <div className="amazon-pd-related-grid mt-8">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      className="amazon-pd-related group block rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow"
                    >
                      <div className="mx-auto flex h-36 items-center justify-center sm:h-40">
                        <img
                          src={productImageSrc(base, p.image)}
                          alt={p.code}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${base}/images/logo.png`;
                          }}
                        />
                      </div>
                      <p className="amazon-pd-accent mt-3 text-sm font-bold">{p.code}</p>
                      <p className="mt-1 text-xs font-medium text-gray-800">{p.category}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">{p.name}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </div>

      {orderModalOpen && product ? (
        <div className="amazon-pd-order-modal fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 border-0 cursor-default"
            aria-label="Close dialog"
            onClick={() => !orderSubmitting && setOrderModalOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pd-order-title"
            className="relative z-[1] w-full max-w-3xl rounded-xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6">
              <h2 id="pd-order-title" className="text-lg font-bold text-black">
                Place order
              </h2>
              <button
                type="button"
                disabled={orderSubmitting}
                onClick={() => setOrderModalOpen(false)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex h-40 items-center justify-center sm:h-44">
                  <img
                    src={productImageSrc(base, product.image)}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                    onError={(ev) => {
                      ev.target.onerror = null;
                      ev.target.src = `${base}/images/logo.png`;
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-black">{product.code}</p>
                {product.name && product.name !== product.code ? (
                  <p className="mt-1 text-sm text-gray-700">{product.name}</p>
                ) : null}
                <p className="mt-2 text-sm text-gray-800">
                  <span className="font-semibold">Qty:</span> {qty}
                </p>
                <p className="mt-1 text-base font-bold text-black">
                  {formatPriceKes(product.price)}/= <span className="text-sm font-normal text-gray-600">each</span>
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={submitProductOrder}>
                <p className="text-sm text-gray-700">
                  Enter your details. We will email this order to you and to our team.
                </p>
                <div>
                  <label htmlFor="pd-order-name" className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
                    Full name
                  </label>
                  <input
                    id="pd-order-name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={200}
                    value={orderName}
                    onChange={(ev) => setOrderName(ev.target.value)}
                    disabled={orderSubmitting}
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="pd-order-email" className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
                    Email
                  </label>
                  <input
                    id="pd-order-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={orderEmail}
                    onChange={(ev) => setOrderEmail(ev.target.value)}
                    disabled={orderSubmitting}
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900"
                  />
                </div>
                {orderFormError ? <p className="text-sm text-red-600">{orderFormError}</p> : null}
                <button
                  type="submit"
                  disabled={orderSubmitting}
                  className="amazon-pd-btn-primary mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white disabled:opacity-60 border-0 cursor-pointer"
                >
                  {orderSubmitting ? (
                    <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Package className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  )}
                  {orderSubmitting ? 'Sending…' : 'Submit order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <a
        href={product ? waOrderHref : 'https://wa.me/254714752613'}
        target="_blank"
        rel="noopener noreferrer"
        className="amazon-pd-chat fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full bg-green-600 py-2 pl-2 pr-4 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700 lg:left-8"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Phone className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="hidden sm:inline">Need Help? Chat with us</span>
        <span className="sm:hidden">Help</span>
      </a>
    </div>
  );
};

export default ProductDetailPage;
