import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card'; // ShadCN
import { Badge } from '@/components/ui/badge'; // Category tag
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
  if (!post) return null;

  const { title, slug, excerpt, category, tags, author, createdAt } = post;

  return (
    <Card className="transition hover:shadow-md bg-background border rounded-lg overflow-hidden">
      <CardHeader>
        <Link to={`/posts/${slug}`} className="text-lg font-semibold hover:text-primary transition">
          {title}
        </Link>
        <p className="text-muted-foreground text-sm">
          {formatDistanceToNow(new Date(createdAt))} ago • by {author?.username || 'Unknown'}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-sm mb-2 text-muted-foreground">{excerpt}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{category?.name || 'Uncategorized'}</Badge>
          {tags?.map((tag, i) => (
            <Badge key={i} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;