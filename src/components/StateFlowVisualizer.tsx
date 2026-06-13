"use client";

import { useState } from "react";
import { ShoppingCart, Database, ShieldAlert, BadgeCheck, Plus, Trash2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Item {
  id: string;
  name: string;
  price: number;
}

const PRODUCTS: Item[] = [
  { id: "p1", name: "Organic Wooden Teether", price: 18.0 },
  { id: "p2", name: "Premium Silicone Bib", price: 12.5 },
  { id: "p3", name: "Soft Cotton Swaddle", price: 24.9 },
];

export function StateFlowVisualizer() {
  const [cartItems, setCartItems] = useState<{ item: Item; quantity: number }[]>([
    { item: PRODUCTS[0], quantity: 1 },
  ]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const addItem = (item: Item) => {
    const existing = cartItems.find((i) => i.item.id === item.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) => (i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
    setActiveStep(0); // Go back to Catalog/State stage to show action
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((i) => i.item.id !== id));
    setActiveStep(0);
  };

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  // Redux log builder
  const getReduxLog = () => {
    switch (activeStep) {
      case 0:
        return `// REDUX ACTION: "cart/addItem"
{
  type: "cart/addItem",
  payload: {
    items: [${cartItems.map((c) => `\n      { id: "${c.item.id}", name: "${c.item.name}", price: ${c.item.price}, qty: ${c.quantity} }`).join(",")}\n    ],
    subtotal: ${subtotal.toFixed(2)}
  }
}
// LocalStorage synced.`;
      case 1:
        return `// LOCAL STORAGE ENVELOPE:
localStorage.setItem('baeby_cart_state', JSON.stringify({
  items: ${JSON.stringify(
    cartItems.map((c) => ({ id: c.item.id, qty: c.quantity })),
    null,
    2
  ).replace(/\n/g, "\n  ")},
  lastUpdated: "${new Date().toISOString().split("T")[0]}"
}));
// State persistence complete. Safe from page reloads.`;
      case 2:
        return `// SERVER-SIDE payload validation:
// POST /api/checkout/verify
const clientPayload = ${JSON.stringify(
          cartItems.map((c) => ({ id: c.item.id, declaredPrice: c.item.price, qty: c.quantity })),
          null,
          2
        ).replace(/\n/g, "\n// ")};

// Database Query:
const dbItems = await Product.find({ _id: { $in: payloadIds } });
// VERIFYING prices against MongoDB schema...
// SUCCESS: Declared prices match database indices exactly.
// Total verified: $${subtotal.toFixed(2)}`;
      case 3:
        return `// ORDER SUBMITTED TO BANKING CHANNEL:
// POST /api/orders/create
// Database schema update:
const order = await Order.create({
  user: req.user.id,
  items: cartItems,
  paymentStatus: "paid",
  totalAmount: ${subtotal.toFixed(2)}
});
// Redux Trigger: dispatch(cart/clearCart());
// STATE RESET COMPLETE. SUCCESS: Order #ORD-849204`;
      default:
        return "";
    }
  };

  const steps = [
    { title: "Redux State", icon: ShoppingCart, desc: "React/Redux Client State updates" },
    { title: "Local Caching", icon: Database, desc: "Sync with LocalStorage" },
    { title: "Auth & DB Check", icon: ShieldAlert, desc: "Server Price Integrity check" },
    { title: "Order Placed", icon: BadgeCheck, desc: "State reset & DB write" },
  ];

  return (
    <Card className="bg-zinc-950/70 border-zinc-800 text-zinc-100 backdrop-blur-md overflow-hidden">
      <CardHeader className="border-b border-zinc-800/60 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-sky-500" />
            <CardTitle className="text-base font-semibold">State & Checkout Flow Architecture</CardTitle>
          </div>
          <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900/60 font-mono text-xs">
            checkout-pipeline
          </Badge>
        </div>
        <CardDescription className="text-zinc-400 text-xs">
          Simulate how e-commerce state transitions from Redux dispatch events to persistent client storage and server-side MongoDB payload audits.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Top Product Selector & Mini Cart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Product Catalog Simulator
            </h4>
            <div className="space-y-1.5">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-2 rounded bg-zinc-900/30 border border-zinc-800/40 text-xs"
                >
                  <div>
                    <div className="font-medium">{prod.name}</div>
                    <div className="text-zinc-500">${prod.price.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={() => addItem(prod)}
                    className="p-1 px-2 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition flex items-center gap-1 text-xs"
                  >
                    <Plus className="w-3 h-3 text-sky-400" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>Client Cart (Redux Store)</span>
              <span className="text-sky-400 font-mono">${subtotal.toFixed(2)}</span>
            </h4>
            <div className="p-2.5 rounded bg-zinc-900/10 border border-zinc-800/80 min-h-[110px] space-y-1.5 max-h-[110px] overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-600 text-xs">
                  Cart is empty. Click &quot;Add to Cart&quot;
                </div>
              ) : (
                cartItems.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="flex items-center justify-between text-xs border-b border-zinc-800/30 pb-1"
                  >
                    <div className="text-zinc-300">
                      {cartItem.item.name} <span className="text-zinc-500 font-mono">x{cartItem.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 font-mono">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(cartItem.item.id)}
                        className="text-zinc-600 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Stepper progress */}
        <div className="border-t border-zinc-900 pt-4 space-y-3">
          <div className="grid grid-cols-4 gap-1">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  disabled={cartItems.length === 0 && idx > 1}
                  className={`p-2 rounded border text-center transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                    activeStep === idx
                      ? "bg-sky-950/20 border-sky-500 text-sky-400 shadow-sm shadow-sky-950/40"
                      : "bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <IconComp className="w-4 h-4 mb-0.5" />
                  <span className="text-xs font-semibold hidden md:inline">{step.title}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step Description */}
            <div className="md:col-span-1 p-3 rounded bg-zinc-900/20 border border-zinc-800/40 flex flex-col justify-center">
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Active Step Lifecycle
              </h5>
              <div className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                <span>{steps[activeStep].title}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{steps[activeStep].desc}</p>
              {activeStep < 3 && cartItems.length > 0 && (
                <button
                  onClick={() => setActiveStep((prev) => Math.min(prev + 1, 3))}
                  className="mt-3 py-1 px-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition text-xs font-medium flex items-center justify-center gap-1 border border-zinc-700 self-start"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Redux State / DB Console */}
            <div className="md:col-span-2 flex flex-col bg-zinc-900/80 border border-zinc-850 rounded-md font-mono text-xs text-zinc-300 overflow-hidden min-h-[140px]">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950 border-b border-zinc-850 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <span>runtime_logger.log</span>
                </div>
                <Badge variant="outline" className="border-zinc-800 text-zinc-500 bg-zinc-900/40 text-xs font-mono leading-none py-0.5">
                  STRICT_MODE
                </Badge>
              </div>
              <div className="p-3 flex-1 overflow-x-auto whitespace-pre leading-normal">
                {getReduxLog().split("\n").map((line, idx) => {
                  const isComment = line.trim().startsWith("//");
                  const isError = line.includes("VERIFYING") || line.includes("VERIFY");
                  const isSuccess = line.includes("SUCCESS") || line.includes("synced");
                  return (
                    <div
                      key={idx}
                      className={
                        isComment
                          ? "text-zinc-600"
                          : isError
                          ? "text-amber-500 font-semibold"
                          : isSuccess
                          ? "text-emerald-400 font-semibold"
                          : "text-zinc-300"
                      }
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
