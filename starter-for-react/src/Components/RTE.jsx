import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({ name, control, label, defaultValue = '' }) => {
  return (
    <div className="">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
         <Editor
  apiKey="xgtwa8ajt9nwdbfj2tgv4wguama554z6v7orcyp158dsv5yv" // ✅ Add this
  initialValue={defaultValue}
  value={value}
  init={{
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  }}
  onEditorChange={(content) => onChange(content)}
/>

        )}
      />
    </div>
  )
}

export default RTE
