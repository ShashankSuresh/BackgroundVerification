export const methodProps = {
  sectionTitle: "title_method",
  description: [
    "Analysmetoden baseras på kunskap och systematik från underrättelsetjänsten och säkerhetsskyddsverksamheten i Polismyndigheten och Säkerhetspolisen. Med den polisiära kompetensen som grund har metoden vidareutvecklats av Svensk Bakgrundsanalys i samarbete med forskare vid Cambridge University.",
    "Data har inhämtats från flera myndigheter och privata databaser, informationen har bearbetats och därefter analyserats för att identifiera avvikelser eller mönster som indikerar risk. Sådana riskindikationer är till exempel engagemang i oseriösa företag eller avvikande inkomstmönster. Riskerna värderas och en helhetsbedömning görs avseende risken (sannolikheten) för att en person inte är pålitlig från säkerhetsynpunkt. Risken presenteras enligt nedanstående utlåtandeskala.",
    "Vid förhöjd risk rekommenderas djupintervjuer, vars utkomst bidrar till en ständig metodutveckling och mer tillförlitliga resultat i de initiala bakgrundsanalyserna.",
  ],
};

export const riskStatementProps = {
  sectionTitle: "title_risk_statement",
  "+3": ["des_grade_3_2", "description_grade_plus_3"],
  "+2": ["des_grade_3_2", "description_grade_plus_2"],
  "+1": ["des_grade_1_0", "description_grade_plus_1"],
  0: ["des_grade_1_0", "description_grade_0"],
  "-1": ["des_grade_1_0", "description_grade_minus_1"],
  "-2": ["des_grade_minus", "description_grade_minus_2"],
  "-3": ["des_grade_minus", "description_grade_minus_3"],
  description:
    "Lorem epsum förekommer med konkurs av bolag. I övrigt finns ingen avvikelse. Samtlig data avseende lorem epsum har analyserats och den samlade bedömningen är att det är låg risk (sannolikhet) att vederbörande inte är pålitlig från säkerhetssynpunkt. Det avser benägenhet och förmåga att följa lagar, regler och överenskommelser, att vara lojal gentemot en arbetsgivare och att skydda värdefull information.",
  content: [
    "Grad +2",
    "Låg risk",
    "Anställning, uppdrag eller samarbete med/för vederbörande avrådes ej.",
  ],
  footer:
    "Oavsett riskutlåtande rekommenderas djupintervju av personer som rekryteras till tjänster med tillgång till särskilt betydelsefull information eller med ett större ansvar. Med en djupintervju kan en mer utförlig analys och riskbedömning göras. Metoden baseras på Polismyndighetens säkerhetsprövningsintervjuer för säkerhetsklassade tjänster.",
};

export const headingProps = {
  title: "title_report",
  subTitle: "title_bg_analysis",
  description: "desc_report",
};

export const deviationProps = {
  sectionTitle: "title_deviations",
  descriptionRight: [
    { label: "label_confidential_markings", value: "confidentiality_markings" },
    { label: "label_citizenship", value: "citizenship" },
    { label: "label_summary_imposition", value: "summary_imposition_fine" },
    { label: "label_indictment", value: "indictment" },
    { label: "label_criminal_cases", value: "criminal_cases" },
    { label: "label_judgements", value: "judgments_civil_law" },
  ],
  descriptionLeft: [
    { label: "label_ruling_in_rent", value: "ruling_rent_tribunal" },
    { label: "label_involvement_business", value: "involvment_businesses" },
    { label: "label_bank_rupties", value: "bankruptcies" },
    { label: "label_no_of_vehicles", value: "number_of_vehicles" },
    { label: "label_economy", value: "economy" },
    { label: "label_no_of_moves", value: "number_of_moves" },
  ],
  footer:
    "Kontrollerade data härrör från Polismyndigheten, Åklagarmyndigheten, tingsrätter, hovrätter, Högsta Domstolen, förvaltningsdomstolar, kammarrätter, Högsta Förvaltningsdomstolen, arbetsdomstolen, Hyresnämnden, Skatteverket, Bolagsverket och Transportstyrelsen, samt Checkbiz och andra privata databaser. Uppgifter om brott och civila tvister är hämtade från den privata rättsdatabasen Verifiera.",
};

export const personDetailsProps = {
  sectionTitle: "title_person",
  content: [
    {
      title: "label_full_name",
      key: "name",
    },
    {
      title: "label_personal_number",
      key: "personal_number",
    },
    {
      title: "label_marital_status",
      key: "maritial_status",
    },
    {
      title: "label_registration_address",
      key: "address",
    },
  ],
};

export const statementScaleProps = {
  sectionTitle: "title_statement_scale",
  description: "desc_statement_scale",
  grad: [
    {
      color: "white",
      bgColor: "green",
      title: "grade",
      grades: "+3",
      statement: ["grade", "label_very_low_risk", "description_very_low_risk"],
      description: {
        title: "title_grade_very_low",
        description: "description_grade",
      },
      values: ["1 på 15 000", "(0,01 %)"],
      footer: "footer_grade_very_low",
    },
    {
      color: "white",
      bgColor: "green",
      title: "grade",
      grades: "+2",
      statement: ["grade", "label_low_risk", "description_low_risk"],
      description: {
        title: "title_grade_low",
        description: "description_grade",
      },
      values: ["1 på 2 000", "(0,05 %)"],
      footer: "footer_grade_very_low",
    },
    {
      color: "grey-dark",
      bgColor: "yellow",
      title: "grade",
      grades: "+1",
      statement: [
        "grade",
        "label_medium_low_risk",
        "description_medium_low_risk",
      ],
      description: {
        title: "title_grade_medium_low",
        description: "description_grade",
      },
      values: ["1 på 400", "(0,25 %)"],
      footer: "footer_grade_medium",
    },
    {
      color: "grey-dark",
      bgColor: "yellow",
      title: "grade",
      grades: "0",
      statement: ["grade", "label_medium_risk", "description_medium_risk"],
      description: {
        title: "title_grade_average",
        description: "description_grade",
      },
      values: ["1 på 80", "(1,25 %)"],
      footer: "footer_grade_medium",
    },
    {
      color: "grey-dark",
      bgColor: "yellow",
      title: "grade",
      grades: "-1",
      statement: [
        "grade",
        "label_medium_high_risk",
        "description_medium_high_risk",
      ],
      description: {
        title: "title_grade_medium",
        description: "description_grade",
      },
      values: ["1 på 20", "(5 %)"],
      footer: "footer_grade_high",
    },
    {
      color: "white",
      bgColor: "red",
      title: "grade",
      grades: "-2",
      statement: ["grade", "label_high_risk", "description_high_risk"],
      description: {
        title: "title_grade_high",
        description: "description_grade",
      },
      values: ["1 på 8", "(12,5 %)"],
      footer: "footer_grade_high",
    },
    {
      color: "white",
      bgColor: "red",
      title: "grade",
      grades: "-3",
      statement: [
        "grade",
        "label_very_high_risk",
        "description_very_high_risk",
      ],
      description: {
        title: "title_grade_very_high",
        description: "description_grade",
      },
      values: ["1 på 3", "(33 %)"],
      footer: "footer_grade_high",
    },
  ],
  footer: "desc_footer",
};

export const recommendationProps = {
  sectionTitle: "title_recommendations",
  indepthContent: [
    {
      title: "Vad är en djupintervju?",
      description: [
        "En djupintervju motsvarar den säkerhetsprövningsintervju som genomförs för säkerhetsklassning av personal till befattningar i Polismyndigheten och annan säkerhetskänslig verksamhet.",
        "Syftet med djupintervjun är att klarlägga om person kan antas vara lojal mot de intressen som ska skyddas, om personen är pålitlig från säkerhetssynpunkt, samt utreda eventuella sårbarheter i säkerhetshänseende",
      ],
    },
  ],
  recommendationContent: [
    {
      title:
        "Rekommenderas vid förhöjd risk – och för mer betydelsefulla befattningar",
      description: [
        "En djupintervju rekommenderas alltid för riskutlåtande av graden +1 eller lägre. Djupintervju rekommenderas även för chefer, medarbetare och konsulter med tillgång till särskilt betydelsefull information eller som har ett större ansvar. Svensk Bakgrundsanalys erbjuder även referenstagning och dokumentverifikation för ytterligare säkerhet.",
      ],
    },
  ],
  prisContent: [
    {
      title: "Pris",
      content: [
        {
          title: "Djupintervju",
          value: "2950 kr",
        },
      ],
    },
  ],
  contactProps: [
    {
      title: "Kontakta oss",
      description: [
        "Kontakta oss direkt för beställning eller mer information.",
      ],
      content: [
        {
          title: "E-post",
          icon: "email",
          description: "info@bakgrundsanalys.se",
        },
        {
          title: "Telefon",
          icon: "call",
          description: "010-491 12 27",
        },
      ],
    },
  ],
};
