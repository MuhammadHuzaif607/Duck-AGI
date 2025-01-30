import ReactMarkdown from 'react-markdown';

const Markdown = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <ReactMarkdown key={index}>{item.body}</ReactMarkdown>
      ))}
    </>
  );
};

export default Markdown;
