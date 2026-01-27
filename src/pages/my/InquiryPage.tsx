import BackHeader from '@/components/common/headers/BackHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

const INQUIRY_TYPES = ['서비스 이용 문의', '오류 신고', '기능 제안', '계정 문의', '기타'];

const InquiryPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [content, setContent] = useState('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const handleSubmit = () => {
    if (!email || !title || !inquiryType || !content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    // TODO: API 연동
    console.log({ email, title, inquiryType, content });
    navigate(-1);
  };

  return (
    <div className='w-[375px] min-h-screen mx-auto bg-[var(--color-bg-secondary)]'>
      {/* Header */}
      <div className='bg-white'>
        <BackHeader
          title='1:1 문의하기'
          rightElement={
            <button type='button' onClick={handleSubmit}>
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
        <div className='bg-white rounded-xl p-4 flex flex-col gap-5'>
          {/* Email */}
          <div>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>
              이메일 주소
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full h-[48px] px-4 border border-[var(--color-line-normal)] rounded-lg ty-body5 text-[var(--color-text-normal)] placeholder:text-[var(--color-text-assistive)] focus:outline-none focus:border-[var(--color-primary-400)]'
              placeholder='이메일을 입력해주세요'
            />
          </div>

          {/* Title */}
          <div>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>제목</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full h-[48px] px-4 border border-[var(--color-line-normal)] rounded-lg ty-body5 text-[var(--color-text-normal)] placeholder:text-[var(--color-text-assistive)] focus:outline-none focus:border-[var(--color-primary-400)]'
              placeholder='제목을 입력해주세요'
            />
          </div>

          {/* Inquiry Type */}
          <div className='relative'>
            <label className='ty-body4 text-[var(--color-text-normal)] block mb-2'>문의 유형</label>
            <button
              type='button'
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className='w-full h-[48px] px-4 border border-[var(--color-line-normal)] rounded-lg ty-body5 text-left flex items-center justify-between focus:outline-none focus:border-[var(--color-primary-400)]'
            >
              <span
                className={
                  inquiryType
                    ? 'text-[var(--color-text-normal)]'
                    : 'text-[var(--color-text-assistive)]'
                }
              >
                {inquiryType || '문의 유형 선택'}
              </span>
              {isTypeDropdownOpen ? (
                <IoChevronUp className='w-5 h-5 text-[var(--color-text-assistive)]' />
              ) : (
                <IoChevronDown className='w-5 h-5 text-[var(--color-text-assistive)]' />
              )}
            </button>

            {/* Dropdown */}
            {isTypeDropdownOpen && (
              <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--color-line-normal)] rounded-lg shadow-lg z-10'>
                {INQUIRY_TYPES.map((type) => (
                  <button
                    key={type}
                    type='button'
                    onClick={() => {
                      setInquiryType(type);
                      setIsTypeDropdownOpen(false);
                    }}
                    className='w-full px-4 py-3 text-left ty-body5 text-[var(--color-text-normal)] hover:bg-[var(--color-bg-secondary)] first:rounded-t-lg last:rounded-b-lg'
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
              className='w-full h-[160px] px-4 py-3 border border-[var(--color-line-normal)] rounded-lg ty-body5 text-[var(--color-text-normal)] placeholder:text-[var(--color-text-assistive)] resize-none focus:outline-none focus:border-[var(--color-primary-400)]'
              placeholder='문의 내용을 입력해주세요'
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='button'
          onClick={handleSubmit}
          className='w-full h-[52px] mt-6 bg-[var(--color-primary-500)] text-white rounded-xl ty-body2 hover:bg-[var(--color-primary-600)] transition-colors'
        >
          문의하기
        </button>
      </div>
    </div>
  );
};

export default InquiryPage;
