import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import PostList from '@/components/PostList'; // Assuming PostList lives here
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 🔝 Top Navigation */}
      <NavBar />

      <div className="flex">
        {/* 🧭 Sidebar */}
        <Sidebar className="w-64 p-4 border-r border-muted hidden md:block" />

        {/* 📄 Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* 🏠 Hero Section */}
          <section className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              Welcome to CivicHub
            </h1>
            <p className="text-muted-foreground text-lg">
              Empowering minds through civic awareness, education, and engagement.
            </p>

            {user && (
              <Link to="/create-post">
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                  📝 Create Post
                </button>
              </Link>
            )}
          </section>

          {/* 📚 Featured Posts */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PostList
              render={(post) => (
                <Card className="border-2 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-2">
                      {post.excerpt || post.content.slice(0, 100)}...
                    </p>
                    <Link
                      to={`/posts/${post.slug}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Read more →
                    </Link>
                  </CardContent>
                </Card>
              )}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;