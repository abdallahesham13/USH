export const handleReservation = () => {
  const route = useRoute();
  const router = useRouter();

  const query = route.query;

  if (route.path === "/") {
    router.push({
      path: "/",
      hash: "#reservation",
      query
    });
  } else {
    router.push({
      path: "/reservation",
      query
    });
  }
};