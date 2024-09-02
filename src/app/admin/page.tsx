'use client'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'


const FormSchema = z.object({
  name: z.string(),
  password: z.string(),
})

const Page = () => {
    const router = useRouter()
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(FormSchema),
  })
const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
})
  const onSubmit = async (data: { name: string; password: string }) => {
    // Handle form submission here
    // adimin can login with name: admin and password: 123456789
    // and can view the all users documents and delete them
    if(data.name === 'admin' && data.password === '123456789'){

      router.push('/admin/dashboard')
    }
    else{
      alert('Invalid name or password')
    }
    
  }


  return (
    <AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default Page
