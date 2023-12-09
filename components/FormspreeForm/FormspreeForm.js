"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Input } from "../Input";

export const FormspreeForm = ({ formId }) => {
  const [state, handleSubmit] = useForm(formId);
  if (state.succeeded) {
    return <p className="max-w-5xl mx-auto my-5">Cảm ơn bạn đã để lại lời nhắn! LaoCaiWeb sẽ phải hồi bạn sớm</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto my-5">
      <div className={'mb-5'}>
        <label className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'} htmlFor="email">Email</label>
        <Input id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div className={'mb-5'}>
        <label className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'} htmlFor="phone">Số điện thoại</label>
        <Input id="phone" type="text" name="phone" />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
      </div>
      <div className={'mb-5'}>
        <label className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'} htmlFor="message">Nội dung</label>
        <textarea
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="message"
          name="message"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <div className={'mb-5'}>
        <button className="btn" type="submit" disabled={state.submitting}>
          Gửi lời nhắn
        </button>
      </div>
    </form>
  );
};
