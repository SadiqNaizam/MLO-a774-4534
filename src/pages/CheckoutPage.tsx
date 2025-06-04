import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from '@/components/ui/label';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

const addressSchema = z.object({
  street: z.string().min(5, "Street address is too short"),
  city: z.string().min(2, "City name is too short"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(2, "Country is required"),
});

const paymentSchema = z.object({
  method: z.enum(["card", "paypal", "cod"], { required_error: "Payment method is required" }),
  cardNumber: z.string().optional(), // Add more specific validation if card is selected
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
});

const checkoutFormSchema = z.object({
  deliveryOption: z.enum(["delivery", "pickup"]),
  address: addressSchema,
  contactName: z.string().min(2, "Name is required"),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  payment: paymentSchema,
  savePaymentInfo: z.boolean().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Placeholder cart summary data
const placeholderOrderSummary = {
  items: [
    { id: 'm3', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
    { id: 'm1', name: 'Garlic Bread', price: 6.99, quantity: 2 },
  ],
  subtotal: 26.97,
  discount: 2.70, // Example
  taxes: 1.94,
  deliveryFee: 5.00,
  total: 31.21,
};


const CheckoutPage = () => {
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      deliveryOption: "delivery",
      address: { street: "", city: "", state: "", zip: "", country: "USA" },
      contactName: "",
      contactPhone: "",
      payment: { method: "card" },
      savePaymentInfo: false,
    },
  });

  console.log('CheckoutPage loaded');

  function onSubmit(data: CheckoutFormValues) {
    console.log('Checkout submitted:', data);
    // Simulate order placement
    // In a real app, this would involve API calls, payment processing, etc.
    navigate(`/track-order/ORD${Math.floor(Math.random() * 100000)}`); // Navigate to a mock order tracking page
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu cartItemCount={placeholderOrderSummary.items.length} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Secure Checkout</h1>
          <p className="text-gray-600 mt-1">Almost there! Just a few more steps to complete your order.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                  <CardDescription>Where should we send your order?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>State / Province</FormLabel>
                            <FormControl><Input placeholder="CA" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="address.zip"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>ZIP / Postal Code</FormLabel>
                            <FormControl><Input placeholder="90210" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="USA">United States</SelectItem>
                                    <SelectItem value="CAN">Canada</SelectItem>
                                    <SelectItem value="MEX">Mexico</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                </CardContent>
              </Card>

              {/* Payment Method Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="payment.method"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="card" /></FormControl>
                              <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="paypal" /></FormControl>
                              <FormLabel className="font-normal">PayPal</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="cod" /></FormControl>
                              <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("payment.method") === "card" && (
                    <div className="mt-4 space-y-4 p-4 border rounded-md">
                        <FormField control={form.control} name="payment.cardNumber" render={({field}) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl><Input placeholder="•••• •••• •••• ••••" {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <div className="grid grid-cols-2 gap-4">
                             <FormField control={form.control} name="payment.expiryDate" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl><Input placeholder="MM/YY" {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="payment.cvv" render={({field}) => (
                                <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl><Input placeholder="•••" {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                         <FormField control={form.control} name="savePaymentInfo" render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                <FormControl><Input type="checkbox" checked={field.value} onChange={field.onChange} className="w-4 h-4"/></FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Save payment information for next time</FormLabel>
                                </div>
                            </FormItem>
                         )}/>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for visibility on scroll */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{placeholderOrderSummary.items.length} items in cart</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {placeholderOrderSummary.items.map(item => (
                            <li key={item.id} className="flex justify-between text-sm">
                              <span>{item.name} (x{item.quantity})</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Separator />
                  <div className="flex justify-between text-sm text-gray-600"><p>Subtotal:</p><p>${placeholderOrderSummary.subtotal.toFixed(2)}</p></div>
                  {placeholderOrderSummary.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600"><p>Discount:</p><p>-${placeholderOrderSummary.discount.toFixed(2)}</p></div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600"><p>Taxes:</p><p>${placeholderOrderSummary.taxes.toFixed(2)}</p></div>
                  <div className="flex justify-between text-sm text-gray-600"><p>Delivery Fee:</p><p>${placeholderOrderSummary.deliveryFee.toFixed(2)}</p></div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-gray-800"><p>Total Amount:</p><p>${placeholderOrderSummary.total.toFixed(2)}</p></div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg" className="w-full">
                    Place Order & Pay ${placeholderOrderSummary.total.toFixed(2)}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;