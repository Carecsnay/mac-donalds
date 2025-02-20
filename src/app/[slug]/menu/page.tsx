interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantMenuPage = async ({ params }: RestaurantMenuPageProps) => {
  const { slug } = await params;
  return <h1>{slug}</h1>;
};

export default RestaurantMenuPage;
