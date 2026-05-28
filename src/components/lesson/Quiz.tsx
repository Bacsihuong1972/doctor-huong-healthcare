"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

interface Props {
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export function Quiz({ questions, onComplete }: Props) {
  // answers: questionId → chosen optionIndex. Undefined = chưa chọn.
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswer = (questionId: string, optionIndex: number) => {
    // Đã chọn rồi thì không cho đổi
    if (answers[questionId] !== undefined) return;

    setAnswers((prev) => {
      const next = { ...prev, [questionId]: optionIndex };

      // Nếu đã trả lời hết tất cả câu → tự động hoàn thành
      const allDone = questions.every((q) => next[q.id] !== undefined);
      if (allDone && onComplete) {
        setTimeout(onComplete, 1400);
      }

      return next;
    });
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
          <h3 className="text-lg font-700 text-heading">
            Kiểm tra hiểu bài ({questions.length} câu)
          </h3>
        </div>
        {answeredCount > 0 && answeredCount < questions.length && (
          <span className="text-sm text-muted">
            {answeredCount}/{questions.length}
          </span>
        )}
      </div>

      {questions.map((q, qIdx) => {
        const chosen = answers[q.id];
        const isAnswered = chosen !== undefined;
        const isCorrect = chosen === q.correctIndex;

        return (
          <div
            key={q.id}
            className="bg-white rounded-2xl p-5 shadow-soft border border-border"
          >
            <p className="font-600 text-text mb-4 leading-snug">
              {qIdx + 1}. {q.question}
            </p>

            <div
              className="space-y-2"
              role="radiogroup"
              aria-label={`Câu hỏi ${qIdx + 1}`}
            >
              {q.options.map((opt, optIdx) => {
                const isChosen = chosen === optIdx;
                const isCorrectOpt = optIdx === q.correctIndex;

                let optClass =
                  "w-full text-left px-5 py-4 rounded-xl border-2 text-base font-500 transition-all min-h-[52px] flex items-center gap-3 cursor-pointer";

                if (!isAnswered) {
                  optClass += " border-border bg-background hover:border-primary/40 hover:bg-primary/5 text-text";
                } else {
                  if (isCorrectOpt) {
                    optClass += " border-primary bg-primary/8 text-primary";
                  } else if (isChosen && !isCorrect) {
                    optClass += " border-warning bg-red-50 text-warning";
                  } else {
                    optClass += " border-border bg-background/50 text-muted";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    role="radio"
                    aria-checked={isChosen}
                    onClick={() => handleAnswer(q.id, optIdx)}
                    disabled={isAnswered}
                    className={cn(optClass)}
                  >
                    {/* Icon kết quả */}
                    {isAnswered && isCorrectOpt && (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    )}
                    {isAnswered && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-warning shrink-0" aria-hidden="true" />
                    )}
                    {/* Radio circle khi chưa trả lời */}
                    {!isAnswered && (
                      <span
                        className="w-5 h-5 rounded-full border-2 border-border shrink-0 flex items-center justify-center"
                        aria-hidden="true"
                      />
                    )}
                    {/* Radio filled khi đã trả lời nhưng không phải đúng/sai */}
                    {isAnswered && !isCorrectOpt && !(isChosen && !isCorrect) && (
                      <span
                        className="w-5 h-5 rounded-full border-2 border-border/50 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Giải thích — hiện ngay sau khi chọn */}
            {isAnswered && (
              <div
                className={cn(
                  "mt-4 rounded-xl p-4 text-sm leading-relaxed",
                  isCorrect
                    ? "bg-primary/8 border border-primary/20 text-primary"
                    : "bg-red-50 border border-warning/20 text-warning"
                )}
                role="status"
                aria-live="polite"
              >
                <span className="font-700 block mb-1">
                  {isCorrect ? "✓ Đúng rồi!" : "Chưa chính xác — nhưng không sao!"}
                </span>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {/* Thông báo hoàn thành */}
      {answeredCount === questions.length && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-primary/8 border border-primary/20 text-primary text-sm font-600">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          Cô chú đã trả lời hết — bài học tự động hoàn thành!
        </div>
      )}
    </div>
  );
}
