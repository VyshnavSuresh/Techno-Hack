import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});
const output=()=>{
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = (event) => {
   const result = event.results[0][0].transcript;
   console.log(result)
  // Handle the speech input here
};
}

const LoginForm = ({ theme = 'blue' }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // Replace this with your actual login logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.email && touched.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password && touched.password ? 'border-red-500' : ''
          }`}
        />
        {errors.password && touched.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
          theme === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
    <button
    type="button" className='border p-4 ml-4 mt-4' onClick={output}>record</button>
  </div>
  );
};

export default LoginForm;
