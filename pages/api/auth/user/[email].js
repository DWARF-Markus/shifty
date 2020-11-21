import { useRouter } from 'next/router';

export default function() {
  const router = useRouter();
  console.log(router.query);
}