import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/logo.svg"
            alt="SBRP Dev module"
            width={200}
            height={200}
          />
        </div>
        <Card className="p-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Insira sua senha"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4  sm:justify-between">
            <Button type="submit" className="w-full bg-[#092F8C]">
              Entrar
            </Button>
            <Link
              href="#"
              className="text-primary hover:underline w-full text-center"
              prefetch={false}
            >
              Criar uma nova conta
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
