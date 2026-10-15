<template>
  <section id="reservation" class="bg-[#faf9f5] px-4 py-16 text-[#313131] lg:px-[6.944vw] lg:py-28" dir="rtl">
    <div class="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[467px_minmax(0,663px)] lg:justify-between" dir="ltr">
      <div class="order-2 h-[440px] overflow-hidden rounded-t-[180px] lg:order-1 lg:h-[593px] lg:w-[467px] lg:rounded-t-[200px]"><img src="/imgs/contact-booking/salon.png" alt="USH Salon" class="h-full w-full object-cover"></div>
      <div class="order-1 w-full lg:order-2 lg:w-[663px]" dir="rtl">
        <header class="mb-14 text-center"><p class="mb-3 text-xl text-[var(--color-primary)]">الحجز</p><h2 class="text-[40px] font-semibold">موعدكِ الجاي عند USH</h2></header>
        <form class="grid gap-6 sm:grid-cols-2" @submit="submit">
          <label class="field">الاسم<span class="control"><img src="/imgs/contact-booking/user.svg" alt=""><input v-model="values.name" placeholder="اسم العميل"></span></label>
          <label class="field">رقم الجوال<span class="control"><img src="/imgs/contact-booking/phone.svg" alt=""><input v-model="values.phone" type="tel" placeholder="05xxxxxxxx"></span></label>
          <label class="field">إختر الخدمة<span class="control"><img src="/imgs/contact-booking/service.svg" alt=""><select v-model="values.category_id"><option value="" disabled>نوع الخدمة</option><option v-for="x in categories" :key="x.id" :value="x.id">{{x.name}}</option></select><img src="/imgs/contact-booking/arrow-down.svg" alt=""></span></label>
          <label class="field">إختر الحي<span class="control"><img src="/imgs/contact-booking/branch.svg" alt=""><select v-model="values.branch_id"><option value="" disabled>الحي</option><option v-for="x in branches" :key="x.id" :value="x.id">{{x.name}}</option></select><img src="/imgs/contact-booking/arrow-down.svg" alt=""></span></label>
          <label class="field sm:col-span-2">البريد الالكتروني<span class="control message"><img src="/imgs/contact-booking/message.svg" alt=""><textarea v-model="values.message" placeholder="رسالتك"></textarea></span></label>
          <button class="h-[50px] rounded-full bg-[var(--color-primary)] text-lg text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:col-span-2" :disabled="loading">احجزي موعدك واتس</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { object, string } from 'yup';
const { $http } = useNuxtApp(); const loading = ref(false);
const { data: categories } = await useAsyncData('booking-categories', () => $http.shared.categories(), { transform: r => r.data, default: () => [] });
const { data: branches } = await useAsyncData('booking-branches', () => $http.shared.branches(), { transform: r => r.data, default: () => [] });
const { handleSubmit, values, resetForm } = useForm({ initialValues: { name:'', phone:'', category_id:'', branch_id:'', message:'' }, validationSchema: object({ name:string().required(), phone:string().matches(/^05\d{8}$/).required(), category_id:string().required(), branch_id:string().required() }) });
const submit = handleSubmit(async v => { try { loading.value=true; const f=new FormData(); Object.entries(v).forEach(([k,x]) => f.append(k, k==='phone' ? String(x).replace(/^0/,'') : String(x||''))); f.append('source_id','1'); await $http.shared.confirmReservation(f); resetForm(); } finally { loading.value=false; } });
</script>
<style scoped>
.field{display:grid;gap:10px;color:#535353;font-size:14px}.control{display:flex;height:50px;align-items:center;gap:12px;border:1px solid #d4d4d4;border-radius:50px;padding:10px 12px;transition:.2s}.control:focus-within{border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent)}.control img{width:24px;height:24px;flex:none}.control input,.control select,.control textarea{min-width:0;flex:1;appearance:none;border:0;outline:0;background:transparent;color:#535353;font-size:16px}.message{height:133px;align-items:flex-start;border-radius:16px;padding-top:16px}.message textarea{height:100%;resize:none}
</style>




