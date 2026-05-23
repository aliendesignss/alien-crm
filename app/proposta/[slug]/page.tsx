import { notFound } from "next/navigation";
import { ExpiredProposal } from "@/components/ExpiredProposal";
import { ProposalTemplate } from "@/components/ProposalTemplate";
import { getSupabase } from "@/lib/supabase";
import type { Proposal } from "@/lib/types";

export const dynamic = "force-dynamic";

function isExpired(dateValue: string) {
  const today = new Date();
  const todayOnly = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const validity = new Date(`${dateValue}T23:59:59Z`);

  return validity < todayOnly;
}

export default async function ProposalPage({ params }: { params: { slug: string } }) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("propostas").select("*").eq("slug", params.slug).maybeSingle();

  if (error || !data) {
    notFound();
  }

  const proposal = data as Proposal;

  if (isExpired(proposal.validade_proposta)) {
    return <ExpiredProposal whatsappUrl={proposal.whatsapp_url} />;
  }

  return <ProposalTemplate proposal={proposal} />;
}
