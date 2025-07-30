
"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useMelaData } from '@/hooks/use-mela-data';
import { melaDataSchema } from '@/lib/schema';
import type { MelaData } from '@/lib/types';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

export default function AdminPage() {
  const { data, updateData, isLoading } = useMelaData();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const methods = useForm<MelaData>({
    resolver: zodResolver(melaDataSchema),
  });

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({ control: methods.control, name: 'categories' });
  const { fields: stallFields, append: appendStall, remove: removeStall } = useFieldArray({ control: methods.control, name: 'stalls' });
  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({ control: methods.control, name: 'products' });
  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({ control: methods.control, name: 'contact.socials' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      toast({ title: "Login Successful", description: "Welcome, Admin!" });
    } else {
      toast({ title: "Login Failed", description: "Incorrect password.", variant: "destructive" });
    }
  };

  const onSubmit = (formData: MelaData) => {
    updateData(formData);
    toast({ title: "Success!", description: "Event details have been updated." });
  };
  
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        methods.setValue('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <Button onClick={() => setIsAuthenticated(false)} variant="outline">Logout</Button>
      </header>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 pb-24">
          
          <Card>
            <CardHeader><CardTitle>Branding & Event Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <FormField
                control={methods.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo Image</FormLabel>
                    <div className="flex items-center gap-4">
                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Logo Preview"
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-md object-contain border p-1"
                        />
                      )}
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField name="eventName" render={({ field }) => <FormItem><FormLabel>Event Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField name="tagline" render={({ field }) => <FormItem><FormLabel>Tagline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField
                control={methods.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Date and Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={field.value ? format(parseISO(field.value), "yyyy-MM-dd'T'HH:mm") : ''}
                        onChange={(e) => {
                          field.onChange(new Date(e.target.value).toISOString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField name="about.title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField name="about.content" render={({ field }) => <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Contact Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <FormField name="contact.email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField name="contact.phone" render={({ field }) => <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <div>
                <h3 className="text-lg font-medium mb-2">Social Links</h3>
                {socialFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end mb-2 p-2 border rounded-md">
                    <FormField name={`contact.socials.${index}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField name={`contact.socials.${index}.url`} render={({ field }) => <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeSocial(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendSocial({ name: '', url: '#', icon: 'Link' })}>Add Social</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {categoryFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end mb-2 p-2 border rounded-md">
                    <FormField name={`categories.${index}.id`} render={({ field }) => <FormItem><FormLabel>ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField name={`categories.${index}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField name={`categories.${index}.emoji`} render={({ field }) => <FormItem><FormLabel>Emoji</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeCategory(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendCategory({ id: '', name: '', emoji: '' })}>Add Category</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Stalls</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {stallFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-end mb-2 p-2 border rounded-md">
                    <FormField name={`stalls.${index}.stallNumber`} render={({ field }) => <FormItem><FormLabel>Stall #</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/></FormControl></FormItem>} />
                    <FormField name={`stalls.${index}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField name={`stalls.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <FormField name={`stalls.${index}.owner`} render={({ field }) => <FormItem><FormLabel>Owner</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeStall(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendStall({ stallNumber: 0, name: '', description: '', owner: '' })}>Add Stall</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Products</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {productFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 mb-4 p-4 border rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField name={`products.${index}.id`} render={({ field }) => <FormItem><FormLabel>ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                        <FormField name={`products.${index}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                        <FormField name={`products.${index}.price`} render={({ field }) => <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/></FormControl></FormItem>} />
                        <FormField name={`products.${index}.rating`} render={({ field }) => <FormItem><FormLabel>Rating (1-5)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/></FormControl></FormItem>} />
                        <FormField name={`products.${index}.categoryId`} render={({ field }) => <FormItem><FormLabel>Category ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                        <FormField name={`products.${index}.stallNumber`} render={({ field }) => <FormItem><FormLabel>Stall #</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/></FormControl></FormItem>} />
                    </div>
                    <FormField name={`products.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>} />
                    <FormField name={`products.${index}.image`} render={({ field }) => <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeProduct(index)}>Remove Product</Button>
                  </div>
                ))}
                <Button type="button" size="sm" onClick={() => appendProduct({ id: `prod${productFields.length+13}`, name: '', description: '', price: 0, rating: 0, image: 'https://placehold.co/600x400.png', categoryId: '', stallNumber: 0, 'data-ai-hint': '' })}>Add Product</Button>
            </CardContent>
          </Card>
          
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border z-50">
            <div className="container">
              <Button type="submit" size="lg" className="w-full">Save Changes</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

    