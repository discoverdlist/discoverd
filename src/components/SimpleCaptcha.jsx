"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function SimpleCaptcha({ onVerify, t }) {
  const [captchaData, setCaptchaData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Gera uma operação matemática simples
  const generateCaptcha = () => {
    setIsLoading(true);
    setUserAnswer("");
    setError(false);
    setIsVerified(false);

    // Tipos de operações: adição, subtração, multiplicação
    const operations = [
      {
        type: "addition",
        symbol: "+",
        generate: () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return {
            question: `${a} + ${b}`,
            answer: a + b,
          };
        },
      },
      {
        type: "subtraction",
        symbol: "-",
        generate: () => {
          const a = Math.floor(Math.random() * 10) + 5;
          const b = Math.floor(Math.random() * 5) + 1;
          return {
            question: `${a} - ${b}`,
            answer: a - b,
          };
        },
      },
      {
        type: "multiplication",
        symbol: "×",
        generate: () => {
          const a = Math.floor(Math.random() * 5) + 1;
          const b = Math.floor(Math.random() * 5) + 1;
          return {
            question: `${a} × ${b}`,
            answer: a * b,
          };
        },
      },
    ];

    // Escolhe uma operação aleatória
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const captcha = operation.generate();

    setCaptchaData({
      ...captcha,
      operationType: operation.type,
      operationSymbol: operation.symbol,
    });

    setIsLoading(false);
  };

  // Gera um novo captcha quando o componente é montado
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Verifica a resposta do usuário
  const verifyCaptcha = () => {
    if (!captchaData) return;

    const userAnswerNum = Number.parseInt(userAnswer, 10);

    if (isNaN(userAnswerNum)) {
      setError(true);
      return;
    }

    if (userAnswerNum === captchaData.answer) {
      setIsVerified(true);
      setError(false);
      onVerify(true);
    } else {
      setError(true);
      generateCaptcha();
      onVerify(false);
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCaptcha();
  };

  const handleRefresh = () => {
    generateCaptcha();
  };

  if (!captchaData) {
    return (
      <div className="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("vote.captchaTitle")}
      </div>

      <div
        className={`p-4 rounded-lg border ${
          error
            ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">
              {t("vote.solveEquation")}:{" "}
              <span className="font-bold">{captchaData.question} = ?</span>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={t("vote.refreshCaptcha")}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              placeholder={t("vote.enterAnswer")}
              className={`flex-1 px-3 py-2 border rounded-md ${
                error
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              aria-invalid={error ? "true" : "false"}
              disabled={isVerified}
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${
                isVerified
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-primary hover:bg-primary/90 text-white"
              }`}
              disabled={isVerified || !userAnswer}
            >
              {isVerified ? t("vote.verified") : t("vote.verify")}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {t("vote.incorrectCaptcha")}
            </p>
          )}

          {isVerified && (
            <p className="text-sm text-green-600 dark:text-green-400">
              {t("vote.captchaSuccess")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
