import PlaylistDetail from '../../../components/PlaylistDetail';
import { featuredPlaylists } from '../../../lib/mockData';

export function generateStaticParams() {
  return [
    { id: 'focus' },
    { id: 'neon' },
    { id: 'calm' },
    { id: 'fresh' },
  ];
}

export default function PlaylistDetailPage({ params }) {
  const playlist = featuredPlaylists.find((item) => item.id === params.id) || featuredPlaylists[0];
  return <PlaylistDetail playlist={playlist} />;
}