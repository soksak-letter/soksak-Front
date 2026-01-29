import BackHeader from '@/components/common/headers/BackHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

const INQUIRY_TYPES = ['신고 관련', '제재 관련', '일반 문의'];

const InquiryPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [content, setContent] = useState('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!email || !title || !inquiryType || !content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append('email', email);
    formData.append('subject', `[${inquiryType}] ${title}`);
    formData.append('message', content);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('문의가 성공적으로 전송되었습니다.');
        navigate(-1);
      } else {
        alert('전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-[375px] min-h-screen mx-auto bg-[var(--color-bg-500)]'>
      {/* Header */}
      <div className='bg-white'>
        <BackHeader
          title='1:1 문의하기'
          rightElement={
            <button type='button' onClick={handleSubmit} disabled={isSubmitting}>
              완료
            </button>
          }
        />
      </div>

      {/* Content */}
      <div className='px-4 py-4'>
        {/* Instruction */}
        <p className='ty-body3 text-[var(--color-text-assistive)] mb-4'>
          문의 사항은 아래에 입력해주세요.
        </p>

        {/* Form Card */}
        <div className='bg-white rounded-xl p-4 flex flex-col gap-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
          {/* Email */}
          <div>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>
              이메일 주소
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='이메일을 입력해주세요'
              className='w-full h-[48px] px-4 bg-[var(--color-bg-500)] rounded-lg ty-body5 text-[var(--color-text-assistive)] placeholder:text-black/60 focus:outline-none'
            />
          </div>

          {/* Title */}
          <div>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>제목</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목을 입력해주세요'
              className='w-full h-[48px] px-4 bg-[var(--color-bg-500)] rounded-lg ty-body5 text-[var(--color-text-assistive)] placeholder:text-black/60 focus:outline-none'
            />
          </div>

          {/* Inquiry Type */}
          <div className='relative'>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>문의 유형</label>
            <button
              type='button'
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className='w-full h-[48px] px-4 bg-[var(--color-bg-500)] rounded-lg ty-body5 text-left flex items-center justify-between focus:outline-none'
            >
              <span
                className={inquiryType ? 'text-[var(--color-text-assistive)]' : 'text-black/60'}
              >
                {inquiryType || '문의 유형 선택'}
              </span>
              {isTypeDropdownOpen ? (
                <IoChevronUp className='w-5 h-5 text-black/60' />
              ) : (
                <IoChevronDown className='w-5 h-5 text-black/60' />
              )}
            </button>

            {/* Dropdown */}
            {isTypeDropdownOpen && (
              <div className='absolute top-full left-0 right-0 mt-1 bg-[var(--color-bg-500)] rounded-lg shadow-lg z-10 overflow-hidden'>
                {INQUIRY_TYPES.map((type) => (
                  <button
                    key={type}
                    type='button'
                    onClick={() => {
                      setInquiryType(type);
                      setIsTypeDropdownOpen(false);
                    }}
                    className='relative w-full px-4 py-3 text-left ty-body5 text-black/60 hover:bg-black/10 after:content-[""] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-black/10 last:after:hidden'
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>문의 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='문의 내용을 입력해주세요'
              className='w-full h-[160px] px-4 py-3 bg-[var(--color-bg-500)] rounded-lg ty-body5 text-[var(--color-text-assistive)] placeholder:text-black/60 resize-none focus:outline-none'
            />
          </div>

          {/* Submit Button */}
          <button
            type='button'
            onClick={handleSubmit}
            disabled={isSubmitting}
            className='w-full h-[52px] bg-[var(--color-primary-500)] text-white rounded-xl ty-body2 hover:bg-[var(--color-primary-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? '전송 중...' : '문의하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
