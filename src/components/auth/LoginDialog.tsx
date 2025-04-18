
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Define the form schema using zod
const loginSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
});

// Hard-coded login credentials for demo purposes
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

const AMBASSADOR_CREDENTIALS = {
  email: 'ambassador@example.com',
  password: 'ambassador123',
};

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (values.email === ADMIN_CREDENTIALS.email && values.password === ADMIN_CREDENTIALS.password) {
        // Admin login successful
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isLoggedIn', 'true');
        
        // Dispatch event to notify App component of the change
        window.dispatchEvent(new Event('localStorageChange'));
        
        toast.success('Welcome Admin!', {
          description: 'You have successfully logged in as an admin.',
        });
        onOpenChange(false);
        
        // Add a small delay to ensure the App component has time to process the state change
        setTimeout(() => {
          navigate('/admin');
        }, 100);
      } else if (values.email === AMBASSADOR_CREDENTIALS.email && values.password === AMBASSADOR_CREDENTIALS.password) {
        // Ambassador login successful
        localStorage.setItem('userRole', 'ambassador');
        localStorage.setItem('isLoggedIn', 'true');
        
        // Dispatch event to notify App component of the change
        window.dispatchEvent(new Event('localStorageChange'));
        
        toast.success('Welcome Ambassador!', {
          description: 'You have successfully logged in as an ambassador.',
        });
        onOpenChange(false);
        
        // Add a small delay to ensure the App component has time to process the state change
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        // Login failed
        toast.error('Login failed', {
          description: 'Invalid email or password. Please try again.',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to Your Account</DialogTitle>
          <DialogDescription>
            Sign in to access your ambassador dashboard and track your referrals.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      disabled={isLoading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your password" 
                      type="password" 
                      disabled={isLoading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        
        <div className="text-center text-sm text-muted-foreground mt-2">
          <p>Demo Accounts:</p>
          <p className="text-xs mt-1">Admin: admin@example.com / admin123</p>
          <p className="text-xs">Ambassador: ambassador@example.com / ambassador123</p>
          <a href="#" className="underline mt-2 block">Forgot password?</a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
