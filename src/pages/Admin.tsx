import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ShieldCheck } from "lucide-react";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth will be implemented with Lovable Cloud
    console.log("Login attempt:", { email, password });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
                Admin Login
              </h1>
              <p className="text-muted-foreground">
                Sign in to manage your store and products
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className="bg-card p-8 rounded-xl card-shadow animate-fade-in space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="admin@artisan.store"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full button-shadow">
                Sign In
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Protected area for store administrators only.
              </p>
            </form>

            {/* Info Note */}
            <div className="mt-6 p-4 bg-muted rounded-lg text-center animate-fade-in">
              <p className="text-sm text-muted-foreground">
                💡 To enable admin functionality, connect Lovable Cloud for authentication and database.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
