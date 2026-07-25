export type BriefingField = {
  id: string;
  label: string;
  placeholder: string;
};

export type ServiceModule = {
  id: string;
  label: string;
  description: string;
  fields: BriefingField[];
};

export const serviceModules: ServiceModule[] = [
  {
    id: "landing-page",
    label: "Landing Page",
    description: "Estrutura, oferta e objetivo principal da pagina.",
    fields: [
      {
        id: "landing_objetivo",
        label: "Objetivo da pagina",
        placeholder: "Captar leads, vender um produto, apresentar um servico..."
      },
      {
        id: "landing_oferta",
        label: "Oferta principal",
        placeholder: "O que sera vendido ou apresentado?"
      },
      {
        id: "landing_referencias",
        label: "Referencias visuais",
        placeholder: "Links, marcas, estilos ou paginas que combinam com o projeto."
      }
    ]
  },
  {
    id: "identidade-visual",
    label: "Identidade Visual",
    description: "Direcao estetica, personalidade e aplicacoes da marca.",
    fields: [
      {
        id: "marca_personalidade",
        label: "Personalidade da marca",
        placeholder: "Minimalista, premium, ousada, acolhedora..."
      },
      {
        id: "marca_cores",
        label: "Cores ou estilos desejados",
        placeholder: "Paleta atual, cores proibidas, sensacoes desejadas."
      },
      {
        id: "marca_aplicacoes",
        label: "Principais aplicacoes",
        placeholder: "Instagram, embalagem, cartao, apresentacao, site..."
      }
    ]
  },
  {
    id: "social-media",
    label: "Social Media",
    description: "Conteudo, rotina e direcao para redes sociais.",
    fields: [
      {
        id: "social_objetivo",
        label: "Objetivo nas redes",
        placeholder: "Atrair clientes, educar audiencia, fortalecer autoridade..."
      },
      {
        id: "social_publico",
        label: "Publico ideal",
        placeholder: "Quem deve ser impactado pelo conteudo?"
      },
      {
        id: "social_temas",
        label: "Temas prioritarios",
        placeholder: "Assuntos, linhas editoriais e temas que precisam aparecer."
      }
    ]
  },
  {
    id: "trafego-pago",
    label: "Trafego Pago",
    description: "Campanhas, verba e metas comerciais.",
    fields: [
      {
        id: "trafego_meta",
        label: "Meta da campanha",
        placeholder: "Leads, vendas, agendamentos, reconhecimento..."
      },
      {
        id: "trafego_verba",
        label: "Verba mensal prevista",
        placeholder: "Valor aproximado de investimento em midia."
      },
      {
        id: "trafego_destino",
        label: "Destino dos anuncios",
        placeholder: "WhatsApp, landing page, Instagram, site..."
      }
    ]
  }
];

export function getServiceLabel(serviceId: string) {
  return serviceModules.find((service) => service.id === serviceId)?.label ?? serviceId;
}
