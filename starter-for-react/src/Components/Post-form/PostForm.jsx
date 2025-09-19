import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import services from '../../lib/Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      FeaturedImage: post?.FeaturedImage || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Slug generation function
  const slugTransform = useCallback((text) => {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
  }, []);

  // Auto-update slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      // Handle file upload
      let fileId = post?.FeaturedImage || null;
      if (data.image && data.image[0]) {
        const uploadedFile = await services.uploadFile(data.image[0]);
        if (uploadedFile) {
          if (post?.FeaturedImage) {
            await services.deleteFile(post.FeaturedImage);
          }
          fileId = uploadedFile.$id;
        }
      }
      data.FeaturedImage = fileId;

      let dbPost;
      if (post) {
        // Update post
        dbPost = await services.updatePost(post.$id, { ...data });
      } else {
        // Create new post
        dbPost = await services.createPost({ ...data, userId: userData.$id });
      }

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Failed to submit post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" encType="multipart/form-data">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Enter title"
          className="mb-4"
          {...register('title', { required: 'Title is required' })}
        />

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: 'Slug is required' })}
          onInput={(e) =>
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={post?.content || ''}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />

        {post?.FeaturedImage && (
          <div className="w-full mb-4">
            <img
              src={services.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Controller
          name="status"
          control={control}
          defaultValue={post?.status || 'active'}
          render={({ field }) => (
            <Select options={['active', 'inactive']} {...field} label="Status" className="mb-4" />
          )}
        />

        <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full">
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
