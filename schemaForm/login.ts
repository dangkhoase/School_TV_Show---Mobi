import { z } from 'zod';
export type Formlogin = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().trim().nonempty('Vui lòng nhập email').email('Địa chỉ email không hợp lệ'),
  password: z.string().trim().nonempty('Vui lòng nhập mật khẩu'),
});
