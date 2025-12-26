import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const { login, register: registerUser, isLoggingIn, isRegistering } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [, setLocation] = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    if (isSignUp) {
      registerUser(data, { onSuccess: () => setLocation("/") });
    } else {
      login(data, { onSuccess: () => setLocation("/") });
    }
  };

  const isLoading = isLoggingIn || isRegistering;

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-serif font-bold text-primary">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp ? "Join our bakery family" : "Sign in to manage your orders"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
                className="mt-1"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{String(errors.username.message)}</p>}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <button 
            className="text-sm text-primary hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
