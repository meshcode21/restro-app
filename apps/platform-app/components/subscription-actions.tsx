'use client';

import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';

export function SubscriptionActions({ organizationId, status }: { organizationId: string, status: string }) {
  const router = useRouter();
  
  const activateMutation = useMutation({
    mutationFn: () => api.post(`/admin/organizations/${organizationId}/subscription/activate`),
    onSuccess: () => {
      // Reload the page to fetch the fresh RSC data
      router.refresh();
    },
    onError: (error) => {
      console.error('Failed to activate subscription', error);
      alert('Failed to activate subscription. Check console for details.');
    }
  });

  return (
    <div className="flex items-center justify-end gap-2">
      {status !== 'active' && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => activateMutation.mutate()}
          disabled={activateMutation.isPending}
        >
          {activateMutation.isPending ? 'Activating...' : 'Activate'}
        </Button>
      )}
      <Button variant="ghost" size="sm">Manage</Button>
    </div>
  );
}
