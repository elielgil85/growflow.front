// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Leaf, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo de volta à sua biblioteca de prompts.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Erro de Login",
        description:
          (error as Error).message ||
          "Credenciais inválidas. Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <MessageSquare className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl font-headline font-bold text-gray-800 mt-4">
            PromptFlow
          </h1>
          <p className="text-muted-foreground">
            Explore e gerencie seus prompts de IA.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Login</CardTitle>
            <CardDescription>
              Acesse sua conta para ver sua biblioteca de prompts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access_id">Access ID</Label>
                <Input
                  // Mudamos o ID e Name para não ter a palavra "email"
                  // Isso evita que o navegador puxe o histórico de e-mails salvos
                  id="access_id"
                  name="access_id"
                  type="email" // Mantido para não mexer no back-end
                  placeholder="••••••••••••"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  // Mantém o visual de bolinhas (password style)
                  style={{ WebkitTextSecurity: "disc" } as React.CSSProperties}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/register" className="underline text-primary">
                Registre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
