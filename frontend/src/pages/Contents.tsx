import { useState } from 'react';
import { BookOpen } from 'react-feather';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { ContentsTable, Layout, ThemeButton } from '../components';
import { AddContentModal, ContentActions, ContentFilter } from '../components';
import useAuth from '../hooks/useAuth';
import CreateContentRequest from '../models/content/CreateContentRequest';
import contentService from '../services/ContentService';
import courseService from '../services/CourseService';

export default function Content() {
  const { id } = useParams<{ id: string }>();
  const { authenticatedUser } = useAuth();
  const isAdminOrEditor = authenticatedUser.role !== 'user';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addContentShow, setAddContentShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userQuery = useQuery('user', async () => courseService.findOne(id));
  const { data, isLoading, refetch } = useQuery(
    [`contents-${id}`, name, description],
    () =>
      contentService.findAll(id, {
        name: name || undefined,
        description: description || undefined,
      }),
  );

  const handleAddContentClick = () => setAddContentShow(true);
  const handleRefreshClick = () => refetch();

  const handleSaveContent = async (
    createContentRequest: CreateContentRequest,
  ) => {
    try {
      await contentService.save(id, createContentRequest);
      setAddContentShow(false);
      setError(null);
      refetch();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Layout
      title="Content"
      subtitle={'Contents and Resources for Selected Course'}
      icon={<BookOpen />}
    >
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">
          {!userQuery.isLoading ? `${userQuery.data.name} Contents` : ''}
        </h1>
      </div>
      <hr />
      {isAdminOrEditor && (
        <ContentActions
          onAddContentClick={handleAddContentClick}
          onRefreshClick={handleRefreshClick}
        />
      )}
      <ContentFilter
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />
      <ContentsTable data={data} isLoading={isLoading} courseId={id} />
      <AddContentModal
        show={addContentShow}
        onClose={() => setAddContentShow(false)}
        onSave={handleSaveContent}
        isSubmitting={isLoading}
        error={error}
      />
    </Layout>
  );
}
