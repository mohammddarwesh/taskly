import { ProjectMember } from '../types/project.types';
import { MemberRow } from './MemberRow';

interface Props {
  members: ProjectMember[];
}

export function MembersTable({ members }: Props) {
  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No members found in this project.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-[rgba(224,232,255,0.3)] h-[54px]">
            <th className="text-left px-8 text-[11px] font-bold uppercase tracking-[1.1px] text-[#434654]">
              Member
            </th>
            <th className="text-left px-8 text-[11px] font-bold uppercase tracking-[1.1px] text-[#434654]">
              Role
            </th>
            <th className="text-right px-8 text-[11px] font-bold uppercase tracking-[1.1px] text-[#434654]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
}