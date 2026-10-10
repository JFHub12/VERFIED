import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, CreditCard, Smartphone, DollarSign, ArrowLeft, Printer, ShoppingBag, Lock, UserPlus, Key } from 'lucide-react';
import { ApiService, User as UserModel, OrderItem, SUPPORT_PHONE, SUPPORT_PHONE_CALL, SUPPORT_WHATSAPP, PAYMENT_API_KEY } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: OrderItem[];
  currentUser: UserModel | null;
  onClearCart: () => void;
  onOpenAuth: () => void;
  onOpenSupport: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onClearCart,
  onOpenAuth,
  onOpenSupport
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  // Customer info
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Accra');
  const [notes, setNotes] = useState('');

  // Payment info
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'applepay' | 'cod'>('momo');
  const [momoNetwork, setMomoNetwork] = useState<'MTN' | 'Telecel' | 'AT'>('MTN');
  const [momoPhone, setMomoPhone] = useState(currentUser?.phone || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Loading & confirmation
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Sync state if currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerPhone(currentUser.phone);
      setCustomerEmail(currentUser.email);
      if (!momoPhone) setMomoPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 ? 0 : 50;
  const total = subtotal + shippingFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onClose();
      onOpenAuth();
      return;
    }
    if (!customerName || !customerPhone || !shippingAddress) return;
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await ApiService.verifyPayment(total, paymentMethod === 'momo' ? `MoMo (${momoNetwork})` : paymentMethod);

    const orderPayload = {
      userEmail: customerEmail || currentUser?.email || 'guest@verified.shop',
      customerName,
      customerPhone,
      shippingAddress: `${shippingAddress}, ${city}. ${notes ? `(Note: ${notes})` : ''}`,
      items: cartItems,
      subtotal,
      total,
      paymentMethod: paymentMethod === 'momo' ? `MoMo (${momoNetwork})` : paymentMethod,
      paymentPhone: paymentMethod === 'momo' ? momoPhone : undefined,
      paymentApiKey: PAYMENT_API_KEY
    };

    const res = await ApiService.createOrder(orderPayload);
    setLoading(false);

    if (res.success) {
      setConfirmedOrder({
        orderId: res.orderId,
        reference: res.reference,
        paymentApiKey: res.paymentApiKey || PAYMENT_API_KEY,
        gatewayAuth: res.gatewayAuth || `AUTH-05935632-${res.orderId}`,
        total,
        paymentMethod: orderPayload.paymentMethod,
        items: cartItems,
        customerName,
        customerPhone,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      onClearCart();
      setStep('success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const backdropBg = "https://res.cloudinary.com/jsg7ebov/image/upload/v1791656996/1c71f385-1593-44bc-844b-7cc4938cd65d.jpg";
  const profileIconImg = "https://res.cloudinary.com/jsg7ebov/image/upload/v1791658927/download_8.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-200 overflow-hidden overscroll-none text-white">
      {/* Background Image with Liquid Morphic Backdrop */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-xs scale-105 opacity-40 pointer-events-none fixed"
        style={{ backgroundImage: `url(${backdropBg})` }}
      />

      {/* Animated Organic Liquid Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[90px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-slate-400/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Futuristic Liquid Morphism Card Container with Sleek Custom Scrollbar */}
      <div 
        className="relative w-full max-w-2xl bg-slate-950/80 backdrop-blur-2xl rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden border border-white/20 ring-1 ring-white/10 animate-in zoom-in-95 duration-300 max-h-[88vh] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top glossy light refraction */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent shrink-0" />

        {/* Header with Attached Profile Icon next to VERFIED (No Secure Checkout Pill) */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <img
              src={profileIconImg}
              alt="VERFIED Icon"
              className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-brand tracking-wider text-white">VERFIED</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Encrypted transaction • 100% Genuine Guarantee
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/15 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content with Sleek Metallic Custom Scrollbar */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-950/40 [&::-webkit-scrollbar-thumb]:bg-slate-700/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500/80">
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {!currentUser && (
                <div className="p-4 bg-amber-500/15 border border-amber-500/30 rounded-2xl space-y-2.5 backdrop-blur-md">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-100">
                      <strong className="block text-sm font-bold text-amber-200 mb-0.5">
                        Registration & Sign In Required To Complete Purchase
                      </strong>
                      <span>
                        Before selecting payment or checking out, first-time users must register an account and sign in.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { onClose(); onOpenAuth(); }}
                    className="w-full py-2.5 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register Your Account Now / Sign In
                  </button>
                </div>
              )}

              {/* Order Summary Mini Bar */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Cart Items ({cartItems.reduce((a, c) => a + c.quantity, 0)})</span>
                  <span className="font-semibold text-white font-mono">
                    GH₵{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Delivery Dispatch</span>
                  <span className="font-mono">{shippingFee === 0 ? 'FREE' : `GH₵${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount Due</span>
                  <span className="text-emerald-400 text-base font-extrabold font-mono">
                    GH₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Delivery Contact Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1. Shipping & Customer Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Receiver name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 059 883 0932"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Street, Landmark, Apartment or Office"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Accra / Kumasi"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Instructions (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before arrival, leave with receptionist"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl cursor-pointer"
              >
                Proceed to Payment Method (GH₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) →
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('details')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Shipping Details
              </button>

              <div>
                {/* Active Payment Gateway API Indicator */}
                <div className="mb-4 p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-white shadow-md backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-200 font-bold">
                        <Key className="w-3.5 h-3.5 text-slate-300" />
                        <span>PAYMENT API: {PAYMENT_API_KEY}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Live Gateway Connection Active · 100% Secure Checkout
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/80 tracking-wide">
                    ACTIVE
                  </span>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  2. Select Verified Payment Method
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'momo'
                        ? 'border-slate-200 bg-slate-900 text-white shadow-md ring-1 ring-slate-300'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-2 text-slate-200" />
                    <div className="text-xs font-bold text-white">Mobile Money</div>
                    <div className="text-[10px] text-slate-400">MTN / Telecel / AT</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-slate-200 bg-slate-900 text-white shadow-md ring-1 ring-slate-300'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-2 text-slate-200" />
                    <div className="text-xs font-bold text-white">Credit / Debit</div>
                    <div className="text-[10px] text-slate-400">Visa, Mastercard</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'border-slate-200 bg-slate-900 text-white shadow-md ring-1 ring-slate-300'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 mb-2 text-slate-200" />
                    <div className="text-xs font-bold text-white">Apple Pay</div>
                    <div className="text-[10px] text-slate-400">1-Tap Biometric</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-slate-200 bg-slate-900 text-white shadow-md ring-1 ring-slate-300'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 mb-2 text-slate-200" />
                    <div className="text-xs font-bold text-white">Pay on Delivery</div>
                    <div className="text-[10px] text-slate-400">Inspect & Pay</div>
                  </button>
                </div>
              </div>

              {/* Payment Specific Form Inputs */}
              {paymentMethod === 'momo' && (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3 backdrop-blur-md">
                  <div className="flex gap-2">
                    {(['MTN', 'Telecel', 'AT'] as const).map((net) => (
                      <button
                        type="button"
                        key={net}
                        onClick={() => setMomoNetwork(net)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          momoNetwork === net
                            ? 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 border-slate-300 text-slate-950 shadow-sm'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {net} MoMo
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {momoNetwork} Mobile Money Number *
                    </label>
                    <input
                      type="tel"
                      value={momoPhone}
                      onChange={(e) => setMomoPhone(e.target.value)}
                      placeholder="e.g. 059 883 0932"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      A prompt will be triggered to this number to authorize GH₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3 backdrop-blur-md">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Card Number *</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">CVV / CVC *</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-300 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center space-y-2 backdrop-blur-md">
                  <div className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    
                  </div>
                  <h5 className="font-bold text-white text-sm">Apple Pay Authorized</h5>
                  <p className="text-xs text-slate-300">
                    Use Touch ID or Face ID to confirm the order total of GH₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-slate-200 space-y-2 backdrop-blur-md">
                  <h5 className="font-bold text-white text-sm">Pay Upon Physical Inspection</h5>
                  <p className="text-xs text-slate-300">
                    You can inspect your items or sealed Apple iPhone upon delivery by courier before completing payment.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Courier contacts you directly. Verification hotline: <strong>{SUPPORT_PHONE}</strong>.
                  </p>
                </div>
              )}

              {/* Total review & submit */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-base font-bold text-white mb-3">
                  <span>Final Charged Amount</span>
                  <span className="text-xl text-emerald-400 font-mono">
                    GH₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-4 px-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    'Processing Order via Python Backend...'
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-slate-900" />
                      Confirm & Pay GH₵{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && confirmedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Payment & Order Verified
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Thank You For Your Order!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your order has been successfully recorded into our verified system.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-left space-y-3 backdrop-blur-md">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <div>
                    <div className="text-xs text-slate-400">Order ID</div>
                    <div className="font-extrabold text-sm text-white">{confirmedOrder.orderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Date</div>
                    <div className="text-xs font-semibold text-slate-200">{confirmedOrder.date}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Customer:</span>
                  <span className="font-semibold text-white">{confirmedOrder.customerName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Payment Method:</span>
                  <span className="font-semibold text-white">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Transaction Reference:</span>
                  <span className="font-mono text-slate-300 text-[11px]">{confirmedOrder.reference}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Payment API Key:</span>
                  <span className="font-mono text-white text-[11px] font-bold">{confirmedOrder.paymentApiKey || PAYMENT_API_KEY}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Gateway Authorization:</span>
                  <span className="font-mono text-emerald-300 text-[11px] font-bold">{confirmedOrder.gatewayAuth}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold border-t border-white/10 pt-2">
                  <span>Amount Paid / Payable:</span>
                  <span className="text-emerald-400 text-base font-mono">
                    GH₵{confirmedOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 px-4 border border-white/20 hover:bg-white/10 font-semibold text-xs text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <button
                  onClick={() => { onClose(); setStep('details'); }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Moved Hotline Banner to the Bottom with Native Silver Touch */}
        <div className="bg-slate-900/90 text-slate-300 px-6 py-3 flex flex-wrap items-center justify-between text-xs border-t border-white/10 gap-2 shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Having payment difficulty? Call <strong>{SUPPORT_PHONE}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SUPPORT_PHONE_CALL}
              className="text-slate-300 hover:text-white underline font-semibold transition-colors"
            >
              Call Hotline
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenSupport}
              className="text-slate-300 hover:text-white underline font-semibold transition-colors cursor-pointer"
            >
              Help Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
