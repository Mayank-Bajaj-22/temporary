import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check if a user is an authorized admin
  const checkAdminStatus = async (currentUser) => {
    if (!currentUser) {
      setIsAdmin(false);
      return false;
    }

    // 1. Check secure app_metadata (cannot be edited by client)
    if (currentUser.app_metadata?.role === 'admin') {
      setIsAdmin(true);
      return true;
    }

    // 2. Check admin_users table in Supabase
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (!error && data) {
        setIsAdmin(true);
        return true;
      }
    } catch (err) {
      console.warn('Error checking admin_users table:', err);
    }

    // In local demo mode (when Supabase is unconfigured), grant access for development testing
    if (!isSupabaseConfigured()) {
      setIsAdmin(true);
      return true;
    }

    setIsAdmin(false);
    return false;
  };

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured()) {
      // Unconfigured / Demo fallback mode
      // Check localStorage for demo session
      const demoUser = localStorage.getItem('buddhahome_demo_admin');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
        setIsAdmin(true);
      }
      setLoading(false);
      return;
    }

    // Initialize Supabase Auth Session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Failed to get Supabase session:', error);
          setAuthError(error.message);
        } else if (currentSession && mounted) {
          setSession(currentSession);
          setUser(currentSession.user);
          await checkAdminStatus(currentSession.user);
        }
      } catch (err) {
        console.error('Unexpected auth initialization error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // Listen for Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      setSession(newSession);
      const currentUser = newSession?.user || null;
      setUser(currentUser);

      if (currentUser) {
        await checkAdminStatus(currentUser);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Real Supabase Login Function
  const login = async (email, password) => {
    setAuthError(null);

    // Fallback if Supabase is unconfigured
    if (!isSupabaseConfigured()) {
      if (!email.trim() || !password.trim()) {
        throw new Error('Please provide an email and password.');
      }
      const demoUser = {
        id: 'demo-admin-id',
        email: email.trim(),
        app_metadata: { role: 'admin' },
      };
      setUser(demoUser);
      setIsAdmin(true);
      localStorage.setItem('buddhahome_demo_admin', JSON.stringify(demoUser));
      return { user: demoUser };
    }

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    const authorized = await checkAdminStatus(data.user);
    if (!authorized) {
      // User is authenticated but not authorized as an administrator
      await supabase.auth.signOut();
      const notAdminError = new Error('Access denied: Your account does not have administrator privileges in BuddhaHome.');
      setAuthError(notAdminError.message);
      throw notAdminError;
    }

    return data;
  };

  // Real Supabase Logout Function
  const logout = async () => {
    setAuthError(null);
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('buddhahome_demo_admin');
    }
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    session,
    isAdmin,
    loading,
    authError,
    login,
    logout,
    isConfigured: isSupabaseConfigured(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
