import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import services from '../../lib/Config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      FeaturedImage: post?.FeaturedImage || "",
      status: post?.status || "active"
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0] ? await services.uploadFile(data.image[0]) : null
      if (file) {
        services.deleteFile(post.FeaturedImage)
        data.FeaturedImage = file.$id
      }
      const dbPost = await services.updatePost(post.$id, { ...data })
      if (dbPost) navigate(`/post/${dbPost.$id}`)
    } else {
      const file = await services.uploadFile(data.image[0])
      if (file) {
        data.FeaturedImage = file.$id
        const dbPost = await services.createPost({ ...data, userId: userData.$id })
        if (dbPost) navigate(`/post/${dbPost.$id}`)
      }
    }
  }

  const slugTransform = useCallback((option) => {
    if (option && typeof option === 'string') {
      return option
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    return ''
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={services.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
