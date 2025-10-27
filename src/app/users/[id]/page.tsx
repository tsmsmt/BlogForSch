import { FileIcon } from 'lucide-react'
import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import PostCard from '@/components/post-card'
import { Separator } from '@/components/ui/separator'
import UserAvatar from '@/components/user-avatar'
import { getCurrentUser } from '@/lib/auth'
import { SITE_URL } from '@/lib/constants'
import { getUserById } from '@/queries/get-user-by-id'

export const generateMetadata = async (
  props: PageProps<'/users/[id]'>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { params } = props
  const { id } = await params
  const { openGraph = {} } = await parent

  const { user } = await getUserById(id)

  if (!user) {
    return {}
  }

  return {
    title: user.name,
    description: user.bio,
    alternates: {
      canonical: `${SITE_URL}/users/${id}`
    },
    openGraph: {
      ...openGraph,
      title: user.name,
      description: user.bio ?? undefined,
      type: 'profile',
      url: `${SITE_URL}/users/${id}`
    }
  }
}

const UserPage = async (props: PageProps<'/users/[id]'>) => {
  const { params } = props
  const { id } = await params
  const currentUser = await getCurrentUser()
  const { user } = await getUserById(id)

  if (!user) {
    notFound()
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <div className='relative size-14 md:size-20'>
          <UserAvatar fill src={user.image} alt={user.name} userId={id} />
        </div>
        <div className='text-xl font-semibold lg:text-3xl'>{user.name}</div>
      </div>
      {user.bio && <p className='mt-4 text-muted-foreground'>{user.bio}</p>}
      <Separator className='my-4' />
      {user.posts.length > 0 ? (
        <div className='mt-4'>
          {user.posts.map((post) => (
            <PostCard key={post.id} post={{ ...post, user: { ...user, id } }} showAuthor={false} user={currentUser} />
          ))}
        </div>
      ) : (
        <div className='my-24 flex flex-col items-center justify-center gap-3'>
          <div className='flex size-24 items-center justify-center rounded-full bg-muted'>
            <FileIcon className='size-14' />
          </div>
          <div className='text-2xl font-semibold'>No posts yet</div>
        </div>
      )}
    </>
  )
}

export default UserPage
