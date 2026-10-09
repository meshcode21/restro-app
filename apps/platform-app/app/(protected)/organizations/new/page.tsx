'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@workspace/ui/components/field';

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function NewOrganizationPage() {
  const router = useRouter();
  const [organizationName, setOrganizationName] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [branchName, setBranchName] = React.useState('');
  const [branchSlug, setBranchSlug] = React.useState('');
  const [adminName, setAdminName] = React.useState('');
  const [adminEmail, setAdminEmail] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const createOrgMutation = useMutation({
    mutationFn: (data: Record<string, string>) => api.post('/admin/organizations', data),
    onSuccess: () => {
      router.push('/organizations');
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.error?.message || 'Failed to create organization. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    createOrgMutation.mutate({ organizationName, slug, branchName, branchSlug, adminName, adminEmail, adminPassword });
  };

  const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOrganizationName(val);
    setSlug(generateSlug(val));
  };

  const handleBranchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBranchName(val);
    setBranchSlug(generateSlug(val));
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Onboard Restaurant</h1>
        <p className="text-muted-foreground">
          Manually create a new organization/tenant on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Enter the basic details for the new tenant.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {errorMsg && (
                <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm mb-4">
                  {errorMsg}
                </div>
              )}
              
              <Field>
                <FieldLabel htmlFor="organizationName">Business Name</FieldLabel>
                <Input
                  id="organizationName"
                  placeholder="e.g. Acme Dining"
                  value={organizationName}
                  onChange={handleOrgNameChange}
                  required
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="slug">URL Slug</FieldLabel>
                <Input
                  id="slug"
                  placeholder="e.g. acme-dining"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
                <FieldDescription>A unique identifier for the tenant.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="branchName">Default Branch Name</FieldLabel>
                <Input
                  id="branchName"
                  placeholder="e.g. Main Branch"
                  value={branchName}
                  onChange={handleBranchNameChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="branchSlug">Default Branch Slug</FieldLabel>
                <Input
                  id="branchSlug"
                  placeholder="e.g. main-branch"
                  value={branchSlug}
                  onChange={(e) => setBranchSlug(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="adminName">Admin Name</FieldLabel>
                <Input
                  id="adminName"
                  placeholder="e.g. John Doe"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="adminEmail">Admin Email</FieldLabel>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="e.g. admin@acmedining.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="adminPassword">Admin Initial Password</FieldLabel>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </Field>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createOrgMutation.isPending}>
                  {createOrgMutation.isPending ? 'Creating...' : 'Create Organization'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
