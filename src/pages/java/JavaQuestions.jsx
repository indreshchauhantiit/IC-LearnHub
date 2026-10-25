import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Search, ChevronDown, ChevronUp, Code2, ListChecks,
  Bookmark, BookmarkCheck, Clock3, GraduationCap, ArrowRight,
} from "lucide-react";
import { javaQuestions, javaTopics } from "../../data/javaQuestions";

const BOOKMARK_KEY = "ic-learn-hub-java-bookmarks";

function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function JavaQuestions() {
  useEffect(() => {
    document.title = "Java Interview Questions and Answers | IC-LearnHub";
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = "Explore free Java interview questions and answers with code examples, explanations, Core Java, OOPs, Strings, Collections and coding practice.";
  }, []);

  const [activeTopic, setActiveTopic] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [openQuestions, setOpenQuestions] = useState(["what-is-java"]);
  const [bookmarks, setBookmarks] = useState(readBookmarks);
  const [savedOnly, setSavedOnly] = useState(false);

  const visibleQuestions = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return javaQuestions.filter((item) => {
      const matchesTopic = activeTopic === "all" || item.topic === activeTopic;
      const matchesSearch = !query || `${item.question} ${item.answer} ${item.topic}`.toLowerCase().includes(query);
      const matchesSaved = !savedOnly || bookmarks.includes(item.id);
      return matchesTopic && matchesSearch && matchesSaved;
    });
  }, [activeTopic, searchText, savedOnly, bookmarks]);

  const toggleQuestion = (id) => {
    setOpenQuestions((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleBookmark = (id) => {
    setBookmarks((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
      return next;
    });
  };

  const chooseTopic = (topic) => {
    setActiveTopic(topic);
    setSavedOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-200">
            <BookOpen size={17} /> Free Learning Resource <span className="text-indigo-400">/</span> Java
          </div>
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">JAVA KNOWLEDGE BASE</p>
              <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Java Interview Questions & Answers</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">Learn Core Java, OOPs, Strings, Collections and coding concepts with examples and clear explanations.</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-indigo-100">
                <span className="inline-flex items-center gap-2"><BookOpen size={16} /> {javaQuestions.length} starter questions</span>
                <span className="inline-flex items-center gap-2"><GraduationCap size={16} /> Beginner to intermediate</span>
                <span className="inline-flex items-center gap-2"><Clock3 size={16} /> Learn at your pace</span>
              </div>
            </div>
            <Link to="/mcq" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50">Practice Java MCQs <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:px-8">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Topics</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {javaTopics.map((topic) => {
              const count = topic.id === "all" ? javaQuestions.length : javaQuestions.filter((item) => item.topic === topic.id).length;
              return <button key={topic.id} onClick={() => chooseTopic(topic.id)} className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition lg:w-full ${activeTopic === topic.id && !savedOnly ? "bg-indigo-50 font-semibold text-indigo-700 ring-1 ring-indigo-100" : "text-slate-600 hover:bg-slate-50"}`}>
                <span>{topic.name}</span><span className={`rounded-md px-1.5 py-0.5 text-xs ${activeTopic === topic.id && !savedOnly ? "bg-white text-indigo-700" : "bg-slate-100 text-slate-500"}`}>{count}</span>
              </button>;
            })}
          </div>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <button onClick={() => setSavedOnly((value) => !value)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ${savedOnly ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"}`}>
              {savedOnly ? <BookmarkCheck size={17} /> : <Bookmark size={17} />} Saved questions <span className="ml-auto text-xs">{bookmarks.length}</span>
            </button>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <label htmlFor="java-question-search" className="mb-2 block text-sm font-semibold text-slate-700">Find a Java question</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
              <input id="java-question-search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search Java, OOPs, String, HashMap..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500"><span>{visibleQuestions.length} question{visibleQuestions.length === 1 ? "" : "s"} found</span><span className="hidden sm:inline">Select a question to view its answer</span></div>
          </div>

          <div className="space-y-4">
            {visibleQuestions.map((item, index) => {
              const isOpen = openQuestions.includes(item.id);
              const topicName = javaTopics.find((topic) => topic.id === item.topic)?.name || "Java";
              return <article key={item.id} id={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200">
                <div className="flex items-start gap-3 p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{topicName}</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.level === "Beginner" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.level}</span></div>
                    <button onClick={() => toggleQuestion(item.id)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-3 text-left">
                      <h2 className="text-base font-bold leading-6 text-slate-900 sm:text-lg">{item.question}</h2>{isOpen ? <ChevronUp className="mt-1 shrink-0 text-indigo-600" size={20} /> : <ChevronDown className="mt-1 shrink-0 text-slate-400" size={20} />}
                    </button>
                  </div>
                  <button onClick={() => toggleBookmark(item.id)} aria-label={bookmarks.includes(item.id) ? "Remove bookmark" : "Save question"} title={bookmarks.includes(item.id) ? "Remove bookmark" : "Save question"} className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600">{bookmarks.includes(item.id) ? <BookmarkCheck size={19} className="text-amber-600" /> : <Bookmark size={19} />}</button>
                </div>
                {isOpen && <div className="border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-700">Answer</h3>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
                  {item.code && <div className="mt-4 overflow-hidden rounded-xl bg-slate-950">
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300"><Code2 size={15} /> Java example</div>
                    <pre className="overflow-x-auto p-4 text-xs leading-6 text-emerald-200 sm:text-sm"><code>{item.code}</code></pre>
                  </div>}
                  <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4"><h3 className="mb-1 flex items-center gap-2 text-sm font-bold text-indigo-900"><ListChecks size={16} /> Explanation</h3><p className="text-sm leading-6 text-indigo-900/80">{item.explanation}</p></div>
                  <Link to={`/java-questions/${item.id}`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Open full question page <ArrowRight size={16} /></Link>
                </div>}
              </article>;
            })}
            {visibleQuestions.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><Search className="mx-auto mb-3 text-slate-300" size={32} /><h2 className="font-bold text-slate-800">No questions found</h2><p className="mt-1 text-sm text-slate-500">Try another keyword or choose a different topic.</p><button onClick={() => { setSearchText(""); setActiveTopic("all"); setSavedOnly(false); }} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Clear filters</button></div>}
          </div>
        </main>

        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-slate-900">On this page</h2>
            <div className="space-y-2.5">{javaTopics.filter((topic) => topic.id !== "all").map((topic) => <button key={topic.id} onClick={() => chooseTopic(topic.id)} className="block w-full text-left text-sm text-slate-500 transition hover:text-indigo-700">{topic.name}</button>)}</div>
          </section>
          <section className="rounded-2xl bg-gradient-to-br from-violet-700 to-indigo-700 p-5 text-white shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><ListChecks size={21} /></div>
            <h2 className="font-bold">Test your knowledge</h2>
            <p className="mt-2 text-sm leading-6 text-indigo-100">Practice topic-wise questions and check how well you understand Java.</p>
            <Link to="/mcq" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-indigo-100">Start MCQ practice <ArrowRight size={16} /></Link>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-sm font-bold text-slate-900">Learning tip</h2>
            <p className="text-sm leading-6 text-slate-500">Read the answer, run the code yourself, then explain the concept in your own words to prepare for interviews.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
