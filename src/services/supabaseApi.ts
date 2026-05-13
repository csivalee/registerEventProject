import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/supabaseClient';

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(), // ใช้ fakeBaseQuery เพราะเราใช้ SDK ของ Supabase
  tagTypes: ['User', 'Admin', 'Coupon'], // ใช้สำหรับสั่ง Refresh ข้อมูลอัตโนมัติ
  endpoints: (builder) => ({
    
    // ดึงข้อมูล Users ทั้งหมด (สำหรับ Admin ดู)
    getUsers: builder.query<any[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('create_date', { ascending: false });
        if (error) return { error };
        return { data };
      },
      providesTags: ['User'],
    }),

    // ดึงข้อมูล User รายบุคคล (สำหรับหน้า Profile ของตัวเอง)
    getUserById: builder.query<any, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();
        if (error) return { error };
        return { data };
      },
      providesTags: ['User'],
    }),

    // Mutation: สำหรับ Check-in ผู้ใช้งาน
    checkInUser: builder.mutation<void, { userId: string; adminName: string }>({
      queryFn: async ({ userId, adminName }) => {
        const { error } = await supabase
          .from('users')
          .update({ 
            check_in_status: true, 
            check_in_date: new Date().toISOString(),
            check_in_by: adminName 
          })
          .eq('id', userId);
        if (error) return { error };
        return { data: undefined };
      },
      invalidatesTags: ['User'], // เมื่อกด Check-in เสร็จ ให้ดึงข้อมูล Users ใหม่ทันที
    }),

    // Mutation: สำหรับจัดการ Coupon
    updateCouponStatus: builder.mutation<void, { userId: string; status: boolean }>({
      queryFn: async ({ userId, status }) => {
        const { error } = await supabase
          .from('users')
          .update({ show_coupon_status: status, show_coupon_date: new Date().toISOString() })
          .eq('id', userId);
        if (error) return { error };
        return { data: undefined };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks สำหรับนำไปใช้ใน Component
export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useCheckInUserMutation,
  useUpdateCouponStatusMutation 
} = supabaseApi;