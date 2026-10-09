'use client';

import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@workspace/ui/components/field';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const loginMutation = useMutation({
    mutationFn: (data: Record<string, string>) => api.post('/auth/admin/login', data),
    onSuccess: () => {
      // Redirect to the dashboard upon successful login
      window.location.href = '/';
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || 'Invalid credentials. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Platform Admin</CardTitle>
          <CardDescription>Enter your credentials to login to the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field data-invalid={errorMsg ? true : undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={errorMsg ? true : undefined}
                />
              </Field>
              
              <Field data-invalid={errorMsg ? true : undefined}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={errorMsg ? true : undefined}
                />
                {errorMsg && (
                  <FieldDescription className="text-destructive">{errorMsg}</FieldDescription>
                )}
              </Field>

              <Button type="submit" className="w-full mt-4" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
