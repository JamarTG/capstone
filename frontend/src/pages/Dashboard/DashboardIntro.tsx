import { Typewriter } from "react-simple-typewriter";
import type { UserData } from "@/types/user";
import { useTheme } from "@/hooks";
import type { FC } from "react";

interface DashboardIntroProps {
  user:
    | {
        data: UserData;
      }
    | undefined;
}

const DashboardIntro: FC<DashboardIntroProps> = ({ user }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`p-2 rounded-xl ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}
    >
      <h1 className="text-4xl font-bold flex">
        <Typewriter
          words={[
            `Hey ${user?.data.firstName || "champ"}, ready to crush some IT today?`,
          ]}
          loop={1}
          cursor={false}
          typeSpeed={30}
          deleteSpeed={0}
          delaySpeed={2000}
        />
      </h1>
      <p className="text-md mt-2 text-gray-400">
        Let's level up your skills and tackle those tricky topics together
      </p>
    </div>
  );
};

export default DashboardIntro;
