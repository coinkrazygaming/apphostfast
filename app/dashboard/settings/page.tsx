'use client';

import { Button } from '@/components/ui/button';
import { User, Bell, Lock, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'security' | 'notifications'>('profile');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-48">
          <div className="space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button className="btn-primary">Save Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Current Plan</h2>
                <div className="mb-6">
                  <p className="text-lg font-semibold mb-2">Cloud Startup</p>
                  <p className="text-muted-foreground">$6.99/month • Renews on February 15, 2024</p>
                </div>
                <Button className="btn-secondary">Upgrade Plan</Button>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
                <Button className="btn-secondary">Update Payment Method</Button>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Invoices</h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold">Invoice #INV-2024-01</p>
                      <p className="text-sm text-muted-foreground">January 15, 2024</p>
                    </div>
                    <p className="font-semibold">$6.99</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button className="btn-primary">Update Password</Button>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
                <p className="text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button className="btn-secondary">Enable 2FA</Button>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-semibold">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on macOS • Last active now</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Email Notifications</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Deployment notifications', description: 'Get notified when your apps deploy' },
                    { label: 'Uptime alerts', description: 'Alerts when your apps go down' },
                    { label: 'Performance alerts', description: 'Notifications for high CPU/memory usage' },
                    { label: 'Billing updates', description: 'Invoice and payment notifications' },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                      <div>
                        <p className="font-medium">{notif.label}</p>
                        <p className="text-sm text-muted-foreground">{notif.description}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
