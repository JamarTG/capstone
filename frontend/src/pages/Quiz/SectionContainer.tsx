import { UseMutateFunction } from "@tanstack/react-query";
import { Section_Map } from "../../constants";
import { CreateQuizPayload, SuccessfulQuizResponse } from "../../types/auth";
import { AxiosError } from "axios";
import SectionCard from "./SectionCard";

const SectionContainer = ({
  createQuizMutate,
}: {
  createQuizMutate: UseMutateFunction<SuccessfulQuizResponse, AxiosError<unknown, any>, CreateQuizPayload, unknown>;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Object.entries(Section_Map).map(([section, data]) => (
        <div key={section} className="h-[180px] w-full">
          <SectionCard
            section={{ name: data.name, bgSrc: data.bgSrc }}
            onClick={() => createQuizMutate({ section: Number(section) })}
          />
        </div>
      ))}
    </div>
  );
};

export default SectionContainer;
