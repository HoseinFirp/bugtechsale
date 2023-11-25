import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

//https://dclaevazetcjjkrzczpc.supabase.co
export const supabaseUrl = "http://kzico.runflare.run/user/login";
const supabaseKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbGFldmF6ZXRjamprcnpjenBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyOTIzNDQsImV4cCI6MTk5ODg2ODM0NH0.LGg0M-taoHgKtxCzr9owrb09epnPaO_Yfz6xVE54sIY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


// useEffect(
//   function () {
//     async function req() {
//       try {
//         const { data } = await axios.get(
//           "http://kzico.runflare.run/product/"
//         );
//         setProducts(data);
//       } catch (error) {
//         setShowWarning(true);
//       }
//     }
//     req();
//   },
//   [setProducts]
// );
// axios.post(
//   "http://kzico.runflare.run/user/login",
//   {
//     email: "email||username",
//     password: "password",
//   }
// )


export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export function useLogin() {


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
