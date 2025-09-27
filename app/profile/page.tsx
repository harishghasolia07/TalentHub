'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader as Loader2, User, Mail, Calendar, LogOut, Edit, Key, Shield, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { isAuthenticated, logout } from '@/lib/clientAuth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isPrivacySettingsOpen, setIsPrivacySettingsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const router = useRouter();

  const fetchUserProfile = useCallback(async () => {
    try {
      // Check if user is authenticated with a valid token
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }

      const token = localStorage.getItem('auth_token');

      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        if (response.status === 403 || response.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          router.push('/login');
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch profile');
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = () => {
    logout();

    toast.success('Logged out successfully!', {
      duration: 3000,
    });

    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const handleEditProfile = () => {
    if (user) {
      setEditForm({ name: user.name });
      setFormError('');
      setIsEditProfileOpen(true);
    }
  };

  const handleSaveProfile = async () => {
    setFormLoading(true);
    setFormError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: editForm.name })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditProfileOpen(false);

        toast.success('Profile updated successfully!', {
          duration: 3000,
        });
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to update profile');
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleChangePassword = () => {
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setFormError('');
    setIsChangePasswordOpen(true);
  };

  const handleSavePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError('New passwords do not match');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      if (response.ok) {
        setIsChangePasswordOpen(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });

        toast.success('Password changed successfully!', {
          duration: 3000,
        });
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to change password');
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteConfirmText('');
    setFormError('');
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setFormError('Please type "DELETE" to confirm account deletion');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');

        toast.success('Account deleted successfully', {
          duration: 3000,
        });

        setIsDeleteConfirmOpen(false);

        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to delete account');
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={fetchUserProfile}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <p className="text-gray-600">No user data available</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
              <CardDescription>
                Your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="font-medium text-gray-700">Name:</div>
                  <div className="col-span-2 text-gray-900">{user.name}</div>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email:
                  </div>
                  <div className="col-span-2 text-gray-900">{user.email}</div>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member since:
                  </div>
                  <div className="col-span-2 text-gray-900">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleEditProfile}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleChangePassword}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsPrivacySettingsOpen(true)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your display name here. Email cannot be changed for security reasons.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {formError && (
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={formLoading}>
                {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currentPassword" className="text-right">
                  Current
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  New
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  Confirm
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {formError && (
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePassword} disabled={formLoading}>
                {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Privacy Settings Dialog */}
        <Dialog open={isPrivacySettingsOpen} onOpenChange={setIsPrivacySettingsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Privacy Settings</DialogTitle>
              <DialogDescription>
                Manage your privacy and data settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Export</h4>
                    <p className="text-sm text-gray-600">Download your account data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-gray-600">Permanently delete your account</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteAccount}
                    disabled={formLoading}
                  >
                    {formLoading ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsPrivacySettingsOpen(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Account Confirmation Dialog */}
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Delete Account
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">What will be deleted:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Your profile and personal information</li>
                    <li>• All your account data and history</li>
                    <li>• Access to your account (this cannot be recovered)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deleteConfirm" className="text-sm font-medium">
                    To confirm deletion, type <span className="font-mono font-bold text-red-600">DELETE</span> below:
                  </Label>
                  <Input
                    id="deleteConfirm"
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="font-mono"
                  />
                </div>

                {formError && (
                  <Alert variant="destructive">
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setDeleteConfirmText('');
                  setFormError('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={formLoading || deleteConfirmText !== 'DELETE'}
              >
                {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
