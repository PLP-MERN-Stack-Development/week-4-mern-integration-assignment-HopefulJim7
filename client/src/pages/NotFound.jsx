import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-primary mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you're looking for doesn’t exist.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </section>
  );
};

export default NotFound;