import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BookOpen, Code2, ListChecks, ChevronRight,
} from "lucide-react";
import { javaQuestions, javaTopics } from "../../data/javaQuestions";

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "description";
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(url) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.rel = "canonical";
    document.head.appendChild(tag);
  }
  tag.href = url;
}

export default function JavaQuestionDetail() {
  const { slug } = useParams();
  const index = javaQuestions.findIndex((item) => item.id === slug);
  const item = index >= 0 ? javaQuestions[index] : null;
  const topic = item
    ? javaTopics.find((entry) => entry.id === item.topic)
    : null;
  const previous = index > 0 ? javaQuestions[index - 1] : null;
  const next = index >= 0 && index < javaQuestions.length - 1
    ? javaQuestions[index + 1]
    : null;

  useEffect(() => {
    if (!item) {
      document.title = "Java question not found | IC-LearnHub";
      setMetaDescription("Browse free Java interview questions and answers on IC-LearnHub.");
      return;
    }
    document.title = `${item.question} | Java Interview Questions | IC-LearnHub`;
    setMetaDescription(
      `${item.question} Clear Java interview answer${item.code ? ", code example," : ""} and explanation for ${topic?.name || "Java"}.`
    );
    const canonical = `${window.location.origin}/java-questions/${item.id}`;
    setCanonical(canonical);
    return () => {
      // The next page sets its own title and description.
    };
  }, [item, topic]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <BookOpen className="mx-auto mb-4 text-indigo-600" size={36} />
        <h1 className="text-2xl font-extrabold text-slate-900">Question not found</h1>
        <p className="mt-3 text-slate-600">This Java question may have moved or the URL may be incorrect.</p>
        <Link to="/java-questions" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
          <ArrowLeft size={17} /> Browse all Java questions
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-indigo-200">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={15} />
            <Link to="/java-questions" className="hover:text-white">Java Q&amp;A</Link>
            <ChevronRight size={15} />
            <span>{topic?.name || "Java"}</span>
          </div>
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
            {topic?.name || "Java"} · {item.level}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{item.question}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-indigo-100">
            Java interview preparation with a clear answer, practical example, and explanation.
          </p>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-8">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-3 text-xl font-bold text-slate-900">Answer</h2>
          <p className="whitespace-pre-line text-base leading-8 text-slate-700">{item.answer}</p>

          {item.code && (
            <section className="mt-7 overflow-hidden rounded-xl bg-slate-950">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">
                <Code2 size={17} /> Java example
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-7 text-emerald-200"><code>{item.code}</code></pre>
            </section>
          )}

          <section className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/70 p-5">
            <h2 className="mb-2 flex items-center gap-2 font-bold text-indigo-950">
              <ListChecks size={18} /> Explanation
            </h2>
            <p className="leading-7 text-indigo-950/80">{item.explanation}</p>
          </section>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {previous ? (
              <Link to={`/java-questions/${previous.id}`} className="group rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-300 hover:bg-indigo-50">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400"><ArrowLeft size={14} /> Previous question</span>
                <span className="mt-1 block font-semibold text-slate-800 group-hover:text-indigo-700">{previous.question}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/java-questions/${next.id}`} className="group rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50 sm:text-right">
                <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Next question <ArrowRight size={14} /></span>
                <span className="mt-1 block font-semibold text-slate-800 group-hover:text-indigo-700">{next.question}</span>
              </Link>
            )}
          </div>
          <Link to="/java-questions" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">
            <ArrowLeft size={16} /> Back to all Java questions
          </Link>
        </article>

        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-bold text-slate-900">Explore topics</h2>
            <div className="space-y-2">
              {javaTopics.filter((entry) => entry.id !== "all").map((entry) => (
                <Link key={entry.id} to="/java-questions" className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700">
                  {entry.name}
                </Link>
              ))}
            </div>
          </section>
          <section className="rounded-2xl bg-gradient-to-br from-violet-700 to-indigo-700 p-5 text-white shadow-md">
            <h2 className="font-bold">Ready to practise?</h2>
            <p className="mt-2 text-sm leading-6 text-indigo-100">Check your understanding with topic-wise Java multiple-choice questions.</p>
            <Link to="/mcq" className="mt-4 inline-flex items-center gap-2 text-sm font-bold hover:text-indigo-100">
              Practice MCQs <ArrowRight size={16} />
            </Link>
          </section>
        </aside>
      </main>
    </div>
  );
}
