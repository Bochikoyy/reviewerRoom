// Study summaries and original practice questions derived from the supplied PDFs.
// Page references use the physical PDF page numbers. This is course revision content.
const section = (title, pages, summary, points, takeaway, table = null) => ({title,pages,summary,points,takeaway,table});
const mc = (prompt, answer, wrong, explanation, page) => ({type:'mcq',prompt,answer,options:[answer,...wrong],explanation,page});
const id = (prompt, answer, aliases, explanation, page) => ({type:'identification',prompt,answer,aliases,explanation,page});
const essay = (prompt, model, rubric, page) => ({type:'essay',prompt,model,rubric,page});
export const lessons = [
  {
    id:1, title:'The language of hormones', sourceTitle:'General concepts', subtitle:'Start with the messengers. Understand how hormones are made, how they travel, and how they bring the body back into balance.', pages:13, time:25, tags:['Foundations','Cell signaling','Feedback'],
    objectives:['Distinguish endocrine, paracrine, and autocrine signaling.','Compare peptide and steroid synthesis, transport, and action.','Explain receptor regulation, feedback, and secretory rhythms.'],
    sections:[
      section('1. What are hormones and chemical messengers?',[1,2],'Hormones are chemical messengers produced by specific cells or tissues. They are usually transported in blood to a distant target and can produce an effect at extremely low concentrations. In veterinary medicine this traditional definition is useful, but it is not absolute: prostaglandins and somatomedins may be made by many tissues rather than by one named endocrine organ.',[
        ['Endocrine effectors','Released into the bloodstream and carried to a distant target organ or tissue.'],
        ['Paracrine effectors','Released into interstitial fluid and act on nearby or adjacent cells. If the messenger acts back on the cell that produced it, the action is called autocrine.'],
        ['Neurotransmitters','Provide short-distance communication between neurons or between a neuron and its target cell. Their action is usually limited to a precise junction or small target area.'],
        ['Exocrine effectors','Released into a body cavity or duct rather than into blood; pancreatic substances released into the gastrointestinal tract are an example.'],
        ['Major functions','Hormones coordinate metabolism, growth, reproduction, energy use, mineral and electrolyte balance, and long-term physiological regulation.'],
        ['Shared chemical messengers','Epinephrine, dopamine, histamine, and somatostatin occur in both nervous and endocrine tissues, showing how closely the systems are related.']
      ],'Endocrine = distant · Paracrine = nearby · Autocrine = self · Neurotransmitter = synapse/junction · Exocrine = duct or cavity',{
        caption:'How chemical communication differs',headers:['System / messenger','Where it is released','Main range or target'],rows:[
          ['Endocrine hormone','Bloodstream','Distant organ or tissue'],['Paracrine effector','Interstitial fluid','Nearby or adjacent cells'],['Autocrine effector','Interstitial fluid','The cell that produced it'],['Neurotransmitter','Neural junction','Another neuron or a specific target cell'],['Exocrine effector','Duct or body cavity','Local lumen, surface, or digestive tract']
        ]}),
      section('2. The endocrine and nervous systems work together',[1,2],'The nervous system usually provides rapid control with short-lived effects. The endocrine system is generally slower to begin but can produce effects lasting from minutes to days. They cooperate to control normal physiology.',[
        ['Milk let-down: stimulus','Suckling stimulates the mammary gland. Sensory signals travel through the spinal tract to the hypothalamus.'],
        ['Milk let-down: hormone synthesis','Neurosecretory neurons in the supraoptic and paraventricular nuclei synthesize oxytocin. The hormone travels down their axons.'],
        ['Milk let-down: release and effect','Oxytocin is released from nerve endings in the posterior pituitary into blood. It reaches the mammary gland and contracts myoepithelial cells surrounding the alveoli, pushing milk into larger cisternae and then the teat.'],
        ['Simple sequence','Suckling → nerve impulses → hypothalamus → oxytocin release → blood → mammary gland → myoepithelial contraction → milk let-down.'],
        ['Adrenal medulla','During stress, preganglionic neurons directly stimulate endocrine cells of the adrenal medulla, allowing rapid hormone release into blood.']
      ],'The nervous system can start an endocrine response: rapid neural detection, longer-lasting hormonal action.',{
        caption:'Endocrine versus nervous control',headers:['Feature','Endocrine system','Nervous system'],rows:[
          ['Main messenger','Hormones','Neurotransmitters / nerve signals'],['Transport','Usually through blood','Along neurons and across synapses'],['Speed','Relatively slow','Very rapid'],['Duration','Longer-lasting; minutes to days','Usually brief; milliseconds to seconds'],['Main role','Long-term or widespread regulation','Rapid, focused control']
        ]}),
      section('3. What hormones control and how signals are amplified',[1,2],'A very small hormone concentration can create a large biological response because endocrine signals are amplified inside target cells. Hormones can also alter enzymes that are already present rather than always requiring new enzyme synthesis.',[
        ['Energy metabolism','Insulin, glucagon, cortisol, epinephrine, thyroid hormones, and growth hormone help regulate how energy is used and stored.'],
        ['Mineral metabolism','Parathyroid hormone, calcitonin, aldosterone, angiotensin, and renin help regulate calcium, sodium, and electrolyte balance.'],
        ['Growth','Growth hormone, thyroid hormone, insulin, estrogen, androgens, and growth factors contribute to growth.'],
        ['Reproduction','Estrogen, androgens, progesterone, LH, FSH, prolactin, and oxytocin participate in reproductive functions.'],
        ['Steroid amplification','One steroid molecule can activate a gene, leading to many mRNA molecules and many enzyme molecules.'],
        ['Protein-hormone amplification','One protein hormone can stimulate production of many cAMP molecules, which activate many enzymes. Significant effects may occur at plasma concentrations around 10⁻¹¹ to 10⁻¹² mol.'],
        ['Existing enzyme activity','Cells have basal enzyme activity even without a hormone. Hormones can increase or decrease the activity of enzymes already present.']
      ],'One hormone molecule can initiate a chain of many intracellular events.'),
      section('4. Hormone classes and protein / peptide synthesis',[2,3],'Hormones are commonly grouped as proteins, peptides, amines, and steroids. Protein and peptide hormones are made as larger inactive precursors, processed, stored in granules, and released when a signal arrives.',[
        ['Step 1 — ribosomes and RER','Ribosomes synthesize a preprohormone. The “pre” segment directs the new molecule into the rough endoplasmic reticulum while it is being made.'],
        ['Step 2 — prohormone','Peptidases in the RER remove the “pre” portion. The remaining prohormone leaves the RER inside small vesicles.'],
        ['Step 3 — Golgi processing','Vesicles fuse with the Golgi apparatus. The prohormone is packaged into secretory granules and cleaved into the active hormone; some prohormone may remain.'],
        ['Step 4 — storage','The active hormone is stored in secretory granules inside the endocrine cell. A small amount may leak out continuously, but most remains stored until the appropriate signal.'],
        ['Step 5 — exocytosis','A signal raises cytoplasmic Ca²⁺. Granules fuse with the cell membrane and release hormone by exocytosis. The process requires Ca²⁺ and ATP. Ca²⁺ can come from the ER, mitochondria, or extracellular fluid.'],
        ['Remember the flow','Ribosome → preprohormone → RER removes “pre” → prohormone → Golgi → active hormone → granule → Ca²⁺ + ATP → exocytosis → blood.']
      ],'Protein / peptide hormones are made first, stored, then released when signaled.',{
        caption:'Major hormone classes',headers:['Class','Examples','General production / behavior'],rows:[
          ['Proteins','Growth hormone, insulin, ACTH','Large amino-acid chains; precursor processing and granule storage'],['Peptides','Oxytocin, vasopressin','Smaller peptide products; stored in granules and released by exocytosis'],['Amines','Dopamine, melatonin, epinephrine','Derived from amino acids; behavior depends on the individual messenger'],['Steroids','Cortisol, progesterone, vitamin D','Cholesterol-derived, lipid-soluble, usually synthesized as needed']
        ]}),
      section('5. Steroid hormone synthesis',[3,4],'Steroid hormones are lipophilic and mainly derived from cholesterol. The common first step is conversion of cholesterol to pregnenolone in mitochondria. Different cells make different steroids because they contain different enzymes.',[
        ['Sources of cholesterol','Most steroid-producing cells obtain cholesterol from the blood. The liver supplies cholesterol in LDL particles. A small amount of precursor can also be made from acetate inside the cell.'],
        ['LDL uptake','LDL binds its membrane receptor, enters the cell, and is broken down by lysosomal enzymes. The released cholesterol is used immediately or stored as cholesterol ester.'],
        ['Pregnenolone','Cholesterol → pregnenolone occurs in mitochondria. Later reactions can occur in mitochondria or other cell compartments.'],
        ['Cell-specific enzymes','Enzymes determine the final product. Adrenal cortical hydroxylases modify carbon positions such as C11 and C21 to make glucocorticoids and mineralocorticoids.'],
        ['Sex-steroid sequence','Pregnenolone → progesterone → androgens → estrogens. Leydig cells can make pregnenolone, progesterone, and androgens but lack the enzymes needed to convert androgens into estrogens.'],
        ['Adrenal sex steroids','The adrenal cortex makes large amounts of adrenocortical hormones and normally small amounts of sex steroids; pathological conditions can increase adrenal sex-steroid production.'],
        ['Not stored as finished hormone','Steroids cross the cell membrane by simple diffusion. The rate of secretion therefore closely equals the rate of synthesis; cholesterol ester is the main stored material.']
      ],'Cholesterol → pregnenolone → cell-specific steroid; synthesis and release are tightly coupled.'),
      section('6. Protein / peptide versus steroid hormones',[3,4],'The storage and release difference is one of the most important contrasts in endocrine physiology.',[
        ['Study the starting material','Peptides begin as amino-acid chains and precursor proteins. Steroids begin with cholesterol.'],
        ['Study the release trigger','Peptide release is a signal-controlled exocytosis event requiring Ca²⁺ and ATP. Steroid release needs no exocytosis because newly made steroid diffuses through the membrane.'],
        ['Study the control point','For peptides, secretion is controlled mainly by release of stored hormone. For steroids, secretion is controlled mainly by the rate of synthesis.']
      ],'Peptides: store the finished product. Steroids: store the precursor.',{
        caption:'High-yield comparison',headers:['Feature','Protein / peptide hormones','Steroid hormones'],rows:[
          ['Starting material','Amino-acid chains / protein precursors','Cholesterol'],['Initial synthesis','Ribosomes, RER, and Golgi','Mitochondria plus other cell compartments'],['Precursor','Preprohormone → prohormone','Cholesterol → pregnenolone → steroid'],['Storage','Finished hormone in secretory granules','No large store of finished hormone; cholesterol ester is stored'],['Release','Ca²⁺- and ATP-dependent exocytosis','Simple diffusion'],['Secretion control','Release of stored hormone','Rate of hormone synthesis']
        ]}),
      section('7. Transport of hormones in blood',[5,6],'Blood plasma is mostly water, so solubility determines how a hormone travels. Free hormone is the biologically active form; bound hormone acts as a transport reservoir.',[
        ['Hydrophilic protein hormones','Protein and peptide hormones dissolve directly in plasma. They may circulate as monomers or polymers; separated subunits generally have lower biological potency.'],
        ['Lipophilic steroid and thyroid hormones','They do not dissolve well in aqueous plasma and therefore bind to plasma proteins.'],
        ['Specific carrier proteins','Transcortin has high affinity for cortisol and corticosterone and can also carry progesterone with lower affinity. High affinity usually means strong binding but low capacity.'],
        ['Albumin','Albumin binds steroid hormones with low affinity but has high capacity because it is present in very high concentration.'],
        ['Free and bound equilibrium','Bound hormone ⇌ free hormone. When tissues use free hormone, bound hormone dissociates to replace it. The free form must be available before a hormone can enter a target cell.'],
        ['How much is free?','About 1% of most lipophilic hormone is free. Cortisol is an exception: up to about 10% may be free.'],
        ['Measurement and physiology','Total hormone = free + bound. Pregnancy can increase binding proteins and alter clearance. Changes in binding proteins can change measured concentration without a simple change in secretion.']
      ],'BOUND = transport and reservoir. FREE = biologically available.',{
        caption:'Blood transport comparison',headers:['Feature','Protein / peptide hormones','Steroid and thyroid hormones'],rows:[
          ['Solubility','Hydrophilic','Lipophilic'],['Blood transport','Dissolved directly in plasma','Mostly bound to plasma proteins'],['Carrier proteins','Usually not required for transport','Required for efficient transport'],['Free fraction','Mostly dissolved / available','Usually a small fraction'],['Active form','Free hormone','Free hormone'],['Important carriers','Usually not central to transport','Specific high-affinity proteins plus albumin'],['Example','Insulin','Cortisol, progesterone, thyroid hormones']
        ]}),
      section('8. Receptors and termination of hormone action',[6,7,8],'A hormone can circulate throughout the body, but only cells with the correct receptor respond. Receptors are specific and have high affinity, allowing a strong response at very low hormone concentrations.',[
        ['Receptor location','Water-soluble proteins and peptides cannot cross the plasma membrane, so their receptors are on the cell surface. Lipid-soluble steroids can cross the membrane and bind receptors in the cytoplasm or nucleus.'],
        ['Specificity and affinity','Specificity determines which hormone is recognized. High affinity means the receptor binds strongly even when hormone concentration is very low.'],
        ['Dissociation','Hormone-receptor binding is noncovalent. As blood hormone concentration falls, more hormone leaves the receptor and the response decreases or stops.'],
        ['Internalization','The hormone-receptor complex can enter by endocytosis. Lysosomes degrade the hormone while the receptor, associated with the vesicle membrane, can be recycled to the cell surface.'],
        ['Spare receptors','Cells usually have more receptors than necessary. Less than 50% may need to be occupied for a maximal response.'],
        ['Upregulation','More receptors increase the chance of interaction and sensitivity. FSH stimulates ovarian granulosa cells to increase LH receptors, shifting control toward LH for ovulation and luteinization.'],
        ['Downregulation','Continuous exposure, a high-affinity agonist, or pathologically high hormone levels can reduce receptor numbers, lower sensitivity, and produce hormone resistance.']
      ],'Receptors determine sensitivity and selectivity, then adapt to persistent stimulation.'),
      section('9. Postreceptor cell responses',[8,9],'After receptor binding, steroid and protein / peptide hormones use different pathways. Steroid effects are often slower because they require gene expression; peptide effects are often faster because they modify existing machinery.',[
        ['Steroid with a cytoplasmic receptor','Steroid crosses membrane → binds cytoplasmic receptor → complex is activated → moves to nucleus → binds DNA response element → mRNA is produced → ribosomes make protein or enzyme → biological response. Androgens and glucocorticoids are examples.'],
        ['Steroid with a nuclear receptor','Some steroids, including estrogen, enter the nucleus and bind nuclear receptors directly. The result is still receptor → DNA response element → mRNA → new protein.'],
        ['Why slower?','Changing gene transcription and making new proteins takes time, but the resulting effects may be sustained.'],
        ['Protein / peptide pathway','These hormones remain outside the cell and bind a membrane receptor. The receptor activates second messengers that alter intracellular enzymes or proteins.'],
        ['cAMP','Hormone → receptor → adenylyl cyclase → cAMP → protein kinases → phosphorylation of proteins → cellular response.'],
        ['Calcium and IP₃','Changes in cytoplasmic Ca²⁺ can signal through proteins such as calmodulin. IP₃, made through phosphatidylinositol metabolism, releases Ca²⁺ from intracellular stores.'],
        ['DAG','DAG is also produced from phosphatidylinositol metabolism. It can activate phospholipase A, promoting arachidonic acid formation and then prostaglandin production.']
      ],'Steroids change gene expression. Peptides use membrane receptors and second messengers.',{
        caption:'Postreceptor comparison',headers:['Feature','Protein / peptide hormones','Steroid hormones'],rows:[
          ['Cross plasma membrane?','No','Yes'],['Receptor location','Plasma membrane','Cytoplasm or nucleus'],['Main mechanism','Second messengers','Gene regulation'],['Key signals','cAMP, Ca²⁺, IP₃, DAG','Hormone-receptor complex at DNA'],['Main effect','Activates existing proteins / enzymes','Stimulates new protein synthesis'],['Typical speed','Usually faster','Usually slower']
        ]}),
      section('10. Hormone metabolism and clearance',[10,11],'Hormone activity is limited by metabolism and removal. Clearance is often fairly constant, so blood concentration commonly reflects secretion, but binding proteins, disease, and active metabolites can change that relationship.',[
        ['Steroid metabolism','Steroids are mainly metabolized in the liver: reduction → conjugation with sulfate or glucuronide → increased water solubility → urinary excretion.'],
        ['Thyroid metabolism','Iodine is removed by deiodination.'],
        ['Protein metabolism','Disulfide bonds may be reduced first, then peptidases cleave the protein hormone into smaller fragments.'],
        ['Metabolites are not always inactive','Testosterone → DHT, which is more potent in certain tissues. Estradiol-17β → estrone in peripheral tissues; estrone remains a natural, relatively potent estrogen.'],
        ['Clearance relationship','When clearance is stable, increased synthesis / secretion generally raises blood concentration and decreased secretion lowers it.'],
        ['What changes clearance?','Pregnancy can increase binding proteins and decrease clearance. Liver disease can reduce binding-protein production and alter clearance.']
      ],'Metabolism usually reduces activity, but the biological activity of each metabolite must be considered.'),
      section('11. Feedback control mechanisms',[11,12],'Hormone concentration is controlled mainly by secretion rate and feedback. Negative feedback is the most common mechanism and continuously adjusts the system toward an appropriate set point.',[
        ['Negative feedback','An increase in hormone concentration decreases further production or secretion. Too little hormone increases production; enough or too much hormone decreases it.'],
        ['Hypothalamus–pituitary axis','Low target-gland hormone → increased hypothalamic releasing hormone → increased pituitary tropic hormone → increased target-gland hormone. High target-gland hormone reverses each upstream step.'],
        ['Continuous adjustment','Negative feedback is not simply on or off. The endocrine system continuously monitors concentration and makes small adjustments.'],
        ['Physiological variables','A substance can start the response. Increased blood glucose increases insulin, and insulin lowers glucose toward normal; this is still negative feedback.'],
        ['Positive feedback','The response strengthens the original stimulus. It is less common and usually drives a defined, temporary event.'],
        ['LH surge example','Follicle growth → increasing estrogen → hypothalamic-pituitary stimulation → large LH surge → ovulation → estrogen stimulus declines. The endpoint prevents the response from continuing indefinitely.']
      ],'Negative feedback returns a variable toward normal; positive feedback drives a process toward a specific endpoint.',{
        caption:'Negative versus positive feedback',headers:['Feature','Negative feedback','Positive feedback'],rows:[
          ['Main effect','Opposes the original change','Amplifies the original change'],['Purpose','Maintains stability','Produces a major, usually temporary event'],['Frequency','Very common','Less common'],['Example','Increased glucose → increased insulin → decreased glucose','Increased estrogen → increased LH → ovulation'],['End result','Returns a variable toward normal','Drives a process toward a specific endpoint']
        ]}),
      section('12. Endocrine secretory patterns',[12,13],'Hormones are not always secreted at a constant rate. Sleep, light, and other environmental or physiological signals can organize release into rhythms.',[
        ['Circadian rhythm','An approximately 24-hour biological rhythm; this is the preferred general term for a daily cycle.'],
        ['Diurnal rhythm','A rhythm specifically associated with activity during the daytime.'],
        ['Nocturnal rhythm','A rhythm that is active mainly at night.'],
        ['Ultradian rhythm','A rhythm that repeats within a day, often in pulses approximately every hour.'],
        ['Exam distinction','Do not call every 24-hour rhythm “diurnal”; circadian is the broader approximately 24-hour term.']
      ],'Circadian ≈ 24 hours · Diurnal = daytime · Nocturnal = nighttime · Ultradian = shorter than a day.'),
      section('13. High-yield exam reminders',[12,13],'Use these compact chains after studying the complete explanations above.',[
        ['Steroid metabolism','Reduction + sulfate / glucuronide conjugation → increased water solubility → urinary excretion.'],
        ['Protein hormone metabolism','Disulfide-bond reduction when needed → peptidase cleavage.'],
        ['Feedback','High hormone → decreased further secretion. Increased stimulus → increased response in positive feedback.'],
        ['Storage','Peptide hormones are stored in granules. Steroids are not stored as finished hormone; cholesterol ester is stored.'],
        ['Action','Steroids enter cells and regulate genes. Peptides bind membrane receptors and use second messengers.'],
        ['Transport','Lipophilic hormones are mostly bound; free hormone is biologically active.']
      ],'If you can explain every chain in this section, you are ready to test yourself.')
    ],
    questions:[
      mc('Which signaling pattern acts on a neighboring cell through local tissue fluid?','Paracrine',['Autocrine','Exocrine','Endocrine'],'Paracrine signaling acts locally on nearby cells, whereas autocrine signaling returns to the secreting cell.',1),
      mc('What directly contracts during oxytocin-mediated milk ejection?','Myoepithelial cells',['Thyroid follicular cells','Ovarian granulosa cells','Adrenal cortical cells'],'Oxytocin contracts myoepithelial cells surrounding mammary alveoli.',1),
      mc('What is the initial large precursor of a peptide hormone?','Preprohormone',['Pregnenolone','Cholesterol ester','cAMP'],'Peptide synthesis begins with a preprohormone on ribosomes.',3),
      mc('Which combination is required for peptide hormone exocytosis?','Calcium and ATP',['Iodine and tyrosine','Cholesterol and LDL','Albumin and cortisol'],'Calcium promotes granule fusion, and exocytosis requires energy.',3),
      mc('Which molecule is formed first from cholesterol in steroid synthesis?','Pregnenolone',['Estradiol','Insulin','Thyroglobulin'],'Cholesterol is converted to pregnenolone in mitochondria.',4),
      mc('Which best describes secretion of a finished steroid hormone?','It is closely coupled to synthesis',['It requires storage in secretory granules','It occurs only through exocytosis','It requires a preprohormone'],'Steroids diffuse out as they are synthesized rather than being stored as finished hormones in granules.',4),
      mc('Which carrier has low affinity but high capacity for many steroid hormones?','Albumin',['Transcortin','A membrane receptor','Adenylyl cyclase'],'Abundant albumin provides high capacity despite weaker binding.',6),
      mc('Which hormone fraction is available to act on target tissues?','Free, unbound hormone',['Only protein-bound hormone','Only conjugated metabolites','Only the hormone bound to albumin'],'The free fraction can interact with target tissues; bound hormone provides a reservoir.',6),
      mc('Continuous exposure to high hormone concentrations may lead to which receptor change?','Downregulation',['Permanent receptor saturation without adaptation','Universal upregulation','Conversion of receptors into hormones'],'Persistent exposure can decrease receptor number and reduce sensitivity.',8),
      mc('Which pathway best represents classical steroid action?','Intracellular receptor → gene expression → protein synthesis',['Membrane duct → digestive cavity','Secretory granule → cAMP storage','Extracellular receptor → iodine trapping'],'Steroid-receptor complexes regulate transcription and protein synthesis.',8),
      mc('Which enzyme produces cAMP in the pathway described in Unit 1?','Adenylyl cyclase',['Peptidase','Thyroperoxidase','Iodotyrosine dehalogenase'],'Adenylyl cyclase generates the second messenger cAMP.',9),
      mc('What is a major intracellular action of IP₃?','Release of calcium from intracellular stores',['Storage of cholesterol as LDL','Binding of cortisol to albumin','Removal of iodine from T4'],'IP₃ mobilizes calcium from intracellular stores.',9),
      mc('Why does conjugation aid steroid excretion?','It increases water solubility',['It increases lipid solubility','It creates secretory granules','It prevents all metabolism'],'Sulfate or glucuronide conjugation makes steroid metabolites more water-soluble.',10),
      mc('Which is an example of negative feedback?','Insulin reduces the glucose increase that stimulated its release',['Estrogen drives the preovulatory LH surge','A messenger binds its own secreting cell','A steroid is converted to a more potent metabolite'],'The insulin response opposes the original increase in blood glucose.',11),
      mc('A hormone pattern repeats approximately once every 24 hours. What is it called?','Circadian',['Ultradian','Autocrine','Exocrine'],'Circadian refers to an approximately 24-hour biological cycle.',12),
      id('Name the signaling mode in which a messenger acts on the same cell that released it.','Autocrine',['autocrine signaling','autocrine effector'],'Autocrine signaling returns to the cell of origin.',1),
      id('Which hormone mediates the milk let-down reflex?','Oxytocin',[],'Oxytocin causes myoepithelial contraction and milk ejection.',1),
      id('What is the principal precursor used to synthesize steroid hormones?','Cholesterol',[],'Steroid synthesis begins from cholesterol.',3),
      id('What process releases stored peptide hormone when secretory granules fuse with the membrane?','Exocytosis',[],'Calcium-dependent granule fusion releases peptide hormones.',3),
      id('Name the cortisol-binding protein described as a specific, high-affinity carrier.','Transcortin',['corticosteroid binding globulin','CBG'],'Transcortin binds cortisol with high affinity and relatively low capacity.',5),
      id('What term describes an increase in receptor numbers that increases sensitivity?','Upregulation',['up regulation'],'More receptors can make a target cell more sensitive.',8),
      id('Give the abbreviation for cyclic adenosine monophosphate.','cAMP',['cyclic AMP'],'cAMP is an intracellular second messenger.',9),
      id('What more potent androgen can be formed from testosterone in certain tissues?','Dihydrotestosterone',['DHT'],'DHT demonstrates that a metabolite can retain or increase biological activity.',10),
      id('Name the most common feedback mechanism controlling hormone secretion.','Negative feedback',['negative feedback control'],'Negative feedback counteracts the initial change and supports stability.',11),
      id('What term describes hormone rhythms that repeat at intervals shorter than a day?','Ultradian',['ultradian rhythm','ultradian rhythms'],'Ultradian pulses recur within the 24-hour day.',12),
      essay('Compare peptide and steroid hormones from synthesis through release.','Peptides are synthesized as preprohormones, processed through the rough ER and Golgi, and stored in granules. Calcium and ATP support exocytosis. Steroids derive from cholesterol through pregnenolone; available enzymes determine the product. Finished steroids are generally released by diffusion as they are synthesized, while cholesterol esters provide precursor storage.',['Describe peptide precursor processing and granule storage.','Explain calcium-dependent exocytosis.','Contrast cholesterol-derived steroid synthesis and immediate release.'],3),
      essay('Explain how suckling produces milk ejection, identifying the neural and endocrine components.','Suckling stimulates mammary sensory input to the hypothalamus. Oxytocin is synthesized in hypothalamic neurons and released from their posterior pituitary terminals into blood. It reaches mammary myoepithelial cells and causes contraction, moving milk from alveoli into ducts and cisternae.',['Trace sensory input to the hypothalamus.','Distinguish hormone synthesis from posterior pituitary release.','Connect oxytocin to myoepithelial contraction and ejection.'],1),
      essay('Explain why a very small hormone signal can cause a large response, and how receptor downregulation can reduce sensitivity.','Signal amplification multiplies a receptor event into many messenger molecules or gene products. A cell may have spare receptors, so maximal response need not require complete occupancy. Persistent stimulation can reduce receptor number, lowering the probability of hormone-receptor interaction and reducing sensitivity.',['Explain a downstream amplification step.','Recognize that all receptors need not be occupied.','Relate persistent exposure to receptor loss and reduced sensitivity.'],8),
      essay('Compare negative and positive feedback using one example of each.','Negative feedback opposes the initial change: glucose stimulates insulin, which lowers glucose. Positive feedback amplifies a signal: increasing estrogen drives the preovulatory LH surge. Positive-feedback events have an endpoint, such as ovulation, rather than increasing indefinitely.',['Define negative feedback and explain the glucose-insulin example.','Define positive feedback and explain the estrogen-LH example.','Identify stability versus amplification and the need for an endpoint.'],11),
      essay('Why can total hormone concentration differ from the hormone available to tissues?','Total hormone includes free and protein-bound hormone. The free fraction is available to target tissues; the bound fraction provides a reservoir in equilibrium with it. Binding-protein changes can alter total levels and clearance, so total concentration does not always mirror free hormone availability.',['Distinguish total, bound, and free hormone.','Explain equilibrium and the reservoir role of binding proteins.','Explain why altered binding can complicate interpretation.'],6)
    ]
  },
  {
    id:2,title:'The body’s control center',sourceTitle:'Hypothalamus & pituitary',subtitle:'Follow the conversation between the brain and its glands—from a neural signal to growth, water balance, and feedback.',pages:11,time:30,tags:['Hypothalamus','Pituitary','Water balance'],
    objectives:['Compare the origins and connections of the anterior and posterior pituitary.','Trace oxytocin and ADH synthesis, transport, and release.','Map anterior pituitary hormones, feedback loops, and GH disorders.'],
    sections:[
      section('1. The hypothalamus and pituitary: a brain–endocrine bridge',[1],'The hypothalamus is the major connection between the nervous and endocrine systems. It produces releasing hormones, inhibitory hormones, other peptides, and amines that coordinate the pituitary; it also controls important autonomic functions.',[
        ['Location','The hypothalamus is part of the diencephalon and forms the floor of the third ventricle. Important neighboring structures include the optic chiasma, tuber cinereum, mammillary bodies, and median eminence.'],
        ['Pituitary relationship','The infundibulum and neurohypophysis are extensions of hypothalamic tissue into the pituitary region.'],
        ['Tropic versus direct action','A tropic hormone stimulates another endocrine gland, such as pituitary ACTH stimulating the adrenal cortex. Prolactin acts more directly on milk-producing tissue.'],
        ['Four pituitary regions','Adenohypophysis (anterior pituitary, mainly pars distalis), neurohypophysis (posterior pituitary, mainly pars nervosa), pars intermedia, and pars tuberalis.'],
        ['Embryology','The adenohypophysis grows upward from oral ectoderm as Rathke’s pouch. The neurohypophysis grows downward from neural ectoderm in the floor of the third ventricle.']
      ],'Anterior pituitary = oral ectoderm and glandular tissue. Posterior pituitary = neural ectoderm and hypothalamic extension.',{
        caption:'Pituitary regions and origin',headers:['Region','Main identity','Embryonic / anatomical relationship'],rows:[
          ['Adenohypophysis','Anterior pituitary; pars distalis','Upward oral-ectoderm extension (Rathke’s pouch)'],['Neurohypophysis','Posterior pituitary; pars nervosa','Downward neural-ectoderm extension of hypothalamus'],['Pars intermedia','Intermediate lobe','Part of adenohypophysis'],['Pars tuberalis','Tuberal portion','Part of pituitary around the stalk']
        ]}),
      section('2. Posterior pituitary: neurosecretory neurons',[1,2],'The neurohypophysis is an extension of the hypothalamus, not an independent gland that makes its own oxytocin and vasopressin. Its nerve cell bodies are in the hypothalamus and their axons terminate in the posterior pituitary.',[
        ['Neurosecretory neurons','They receive neural input but do not primarily innervate other neurons. Instead, they release their secretory products into blood so the hormones can reach distant tissues.'],
        ['Two nuclei','Most cell bodies are in the supraoptic and paraventricular nuclei. Both nuclei can contribute to both oxytocin and vasopressin; assigning one hormone exclusively to one nucleus is an oversimplification.'],
        ['Vasopressin precursor','Vasopressin begins as prepropressoPhysin. Removal of the pre-segment creates a prohormone; axonal processing produces vasopressin and neurophysin II.'],
        ['Oxytocin precursor','Oxytocin begins as preprooxyphysin. Processing produces oxytocin and neurophysin I. Neurophysin I is released with oxytocin and can serve as an indicator of oxytocin release, although its physiological role is uncertain.'],
        ['Release sequence','Neural stimulation → depolarization → action potential down the axon → Ca²⁺ entry at the terminal → granule fusion → exocytosis into blood.']
      ],'Hypothalamic cell body → axonal transport → posterior pituitary nerve terminal → blood.',{
        caption:'Posterior pituitary hormone handling',headers:['Stage','Oxytocin','Vasopressin / ADH'],rows:[
          ['Preprohormone','Preprooxyphysin','PrepropressoPhysin'],['Associated neurophysin','Neurophysin I','Neurophysin II'],['Made in','Hypothalamic magnocellular neurons','Hypothalamic magnocellular neurons'],['Released from','Posterior pituitary nerve terminals','Posterior pituitary nerve terminals']
        ]}),
      section('3. Oxytocin and vasopressin / ADH',[2,3],'The two principal posterior-pituitary hormones act directly on target tissues after being synthesized in the hypothalamus.',[
        ['Oxytocin: mammary gland','It contracts myoepithelial cells around mammary alveoli, pushing milk into ducts and cisterns for milk ejection.'],
        ['Oxytocin: uterus','It contracts uterine myometrium and contributes to uterine contraction.'],
        ['ADH: kidney','Its primary role is antidiuresis, promoting renal water retention and supporting body-water balance.'],
        ['ADH: blood vessels','Its secondary pressor action contracts vascular smooth muscle and can increase blood pressure.'],
        ['Species forms','Most species have arginine vasopressin (AVP); pigs have lysine vasopressin; birds have arginine vasotocin.']
      ],'Oxytocin contracts mammary and uterine smooth muscle. ADH conserves water and can raise vascular tone.'),
      section('4. How vasopressin release is controlled',[2,3],'The most important stimulus for ADH release is increased plasma osmolality, but volume and pressure receptors also contribute.',[
        ['Osmotic control','Increased plasma osmolality means too little water relative to solute. Hypothalamic osmoreceptors fire more, vasopressin neurons release ADH, kidneys retain water, and osmolality moves back toward normal.'],
        ['Rapid drinking signal','Receptors in the esophagus and stomach can detect water intake before a large change in plasma osmolality occurs.'],
        ['Volume control','Decreased blood volume alters atrial stretch-receptor signaling and increases ADH release.'],
        ['Pressure control','Reduced blood pressure stimulates baroreceptors in the carotid sinus and aortic arch, which also increase ADH release.'],
        ['Feedback','The body normally keeps the solute-to-water relationship within a narrow range; ADH is part of a negative-feedback loop.']
      ],'↑ plasma osmolality, ↓ blood volume, or ↓ blood pressure → ↑ ADH → water retention.',{
        caption:'Major stimuli for ADH release',headers:['Stimulus','Sensor / pathway','Result'],rows:[
          ['↑ Plasma osmolality','Hypothalamic osmoreceptors','↑ ADH → kidney retains water'],['↓ Blood volume','Atrial stretch receptors and hypothalamic pathways','↑ ADH → supports circulating volume'],['↓ Blood pressure','Carotid-sinus and aortic-arch baroreceptors','↑ ADH → water retention and pressor support'],['Water intake','Esophageal and gastric receptors','Early adjustment before osmolality changes']
        ]}),
      section('5. Diabetes insipidus, primary polydipsia, and SIADH',[3,4],'Disorders of ADH secretion or response produce characteristic water-balance patterns. The clinical signs can be striking even when routine bloodwork is otherwise normal.',[
        ['Central DI','There is insufficient circulating ADH. Primary causes include idiopathic or congenital disease; secondary causes include head trauma and neoplasia.'],
        ['Nephrogenic DI','ADH may be present, but the kidney does not respond appropriately.'],
        ['Clinical pattern','Profound polyuria, polydipsia, nocturia, urinary incontinence, weight loss, and dehydration can occur. The unit notes that young adults around six months may be commonly affected, but DI can occur at any age, breed, or sex.'],
        ['Typical measurements','Urine / water intake may exceed 100 mL/kg/day versus a normal approximate 40–70 mL/kg/day. Plasma osmolality is often >310 mOsm/L in DI; urine specific gravity may remain around 1.004–1.012.'],
        ['Primary polydipsia','Excessive drinking itself can cause overhydration and plasma osmolality often <290 mOsm/L, contrasting with dehydrated DI.'],
        ['Secondary dehydration findings','If water access is inadequate, hematocrit may rise slightly and hypernatremia may develop; these are consequences of dehydration rather than the primary defect.'],
        ['Testing and safety','A modified water-deprivation test asks whether endogenous ADH is released during dehydration and whether kidneys respond to it. ADH supplementation can help separate deficiency from renal resistance. Rule out common PU/PD causes and renal failure first; water deprivation in an animal with unrecognized renal failure can cause serious illness.'],
        ['SIADH','Vasopressin is secreted without a proper osmotic or volume stimulus. It is rare and is often associated with neoplasia, including ectopic ADH-producing tumors; the lungs are a common site discussed in the unit.']
      ],'Central DI = too little ADH. Nephrogenic DI = kidney resistance. SIADH = inappropriate ADH.',{
        caption:'Conceptual comparison of water-balance disorders',headers:['Condition','Primary problem','Expected pattern'],rows:[
          ['Central DI','Insufficient ADH secretion','PU/PD, dilute urine, often high plasma osmolality'],['Nephrogenic DI','Kidney does not respond to ADH','PU/PD, dilute urine, often high plasma osmolality'],['Primary polydipsia','Excessive water intake','Overhydration and often low plasma osmolality'],['SIADH','Inappropriate ADH release','ADH despite no appropriate osmotic / volume stimulus']
        ]}),
      section('6. Anterior pituitary hormones and POMC',[5,6],'The adenohypophysis contains pars distalis and pars intermedia. Six major anterior-pituitary hormones are GH, PRL, TSH, FSH, LH, and ACTH.',[
        ['GH / somatotropin','Produced by acidophilic somatotropes. It is a single-chain protein with two disulfide bonds.'],
        ['PRL','Produced by lactotropes. It is also a single-chain protein, with three disulfide bonds. GH and PRL share about 50% amino-acid similarity, but GH activity is strongly species-specific.'],
        ['TSH, FSH, and LH','Produced by thyrotropes and gonadotropes. They are glycoproteins with a shared alpha subunit and hormone-specific beta subunits held together noncovalently.'],
        ['Other glycoproteins','eCG, formerly pregnant mare’s serum gonadotropin, and primate chorionic gonadotropin are placental members of the broader glycoprotein family.'],
        ['POMC in pars distalis','Corticotropes process POMC to ACTH, which stimulates the adrenal cortex, especially cortisol production.'],
        ['POMC in pars intermedia','Processing produces α-MSH as the predominant product and corticotropin-like intermediate-lobe peptide of uncertain function. β-lipotropin can yield β-endorphins and γ-lipotropin; β-endorphins have opioid activity and may modulate gonadotropin secretion.']
      ],'Shared alpha subunit; specific beta subunit. POMC processing depends on pituitary region.',{
        caption:'Anterior pituitary cells and products',headers:['Cell / region','Hormone or product','Key point'],rows:[
          ['Somatotrope','GH','Growth; stimulates IGF-1'],['Lactotrope','PRL','Mammary / reproductive functions'],['Thyrotrope','TSH','Stimulates thyroid'],['Gonadotrope','FSH and LH','Gonadal function and ovulation'],['Corticotrope / pars distalis','ACTH from POMC','Stimulates adrenal cortex'],['Pars intermedia','α-MSH and related peptides','Regional POMC processing']
        ]}),
      section('7. Hypothalamic control and the portal system',[6,7],'The hypophyseal portal system lets hypothalamic hormones reach the anterior pituitary without first being diluted throughout general circulation. Popa and Fielding described the connecting vessels in the 1930s; Geoffrey Harris later concluded that blood flows from hypothalamus to anterior pituitary through this portal system.',[
        ['Vascular route','Dorsal hypophyseal artery → capillary network in median eminence → portal veins → capillary / sinusoidal network in pars distalis.'],
        ['Regional supply','The dorsal hypophyseal artery supplies the adenohypophysis; the ventral hypophyseal artery supplies the neurohypophysis. Two portal venous pathways supply ventral / central and dorsal / peripheral pars-distalis regions.'],
        ['Hypophysiotropic hormones','Releasing and inhibiting hormones enter the median eminence, travel in portal blood, and control anterior-pituitary secretion. Neural and hormonal signals regulate their production; related hormones can also be found in brain, gastrointestinal tract, and pancreas.'],
        ['Core sequence','Hypothalamus → releasing / inhibiting hormone → portal blood → anterior pituitary → pituitary hormone.']
      ],'Portal blood keeps hypothalamic signals concentrated at the anterior pituitary.',{
        caption:'Major hypothalamic regulators',headers:['Hormone','Abbreviation','Main pituitary effect'],rows:[
          ['Corticotropin-releasing hormone','CRH','↑ ACTH and POMC-derived peptides'],['Gonadotropin-releasing hormone','GnRH','↑ FSH and LH'],['Thyrotropin-releasing hormone','TRH','↑ TSH'],['Growth hormone-releasing hormone','GHRH','↑ GH'],['Somatostatin / GH-inhibiting hormone','GHIH','↓ GH'],['Dopamine / prolactin-inhibiting hormone','PIH','↓ PRL and also ↓ TSH'],['Prolactin-releasing factor','PRF','Stimulates PRL; source uncertain']
        ]}),
      section('8. Hypothalamic peptides, tropic hormones, and feedback',[7,8],'The hypothalamic signals differ in size and chemistry, and the anterior-pituitary hormones participate in both direct actions and endocrine axes.',[
        ['Peptide details','CRH is a 41-amino-acid peptide; GnRH is a decapeptide; TRH is a tripeptide; GHRH is a 44-amino-acid polypeptide; somatostatin is a tetradecapeptide. Dopamine is the exception: it is a catecholamine.'],
        ['Tropic hormones','FSH, LH, TSH, and ACTH act on other endocrine tissues. GH is also considered tropic because it stimulates the liver to produce IGF-1 (somatomedin), which contributes to GH feedback. PRL remains the major anterior-pituitary hormone without demonstrated target-hormone negative feedback.'],
        ['Long-loop feedback','CRH → ACTH → adrenal cortex → cortisol; cortisol inhibits both hypothalamic CRH and pituitary ACTH.'],
        ['Short-loop feedback','A pituitary hormone can inhibit its hypothalamic releasing hormone; ACTH inhibition of CRH is the example in the unit.'],
        ['Pulsatile gonadotropins','FSH and LH alternate between secretion and no secretion. Progesterone-dominant states produce lower pulse frequency and higher amplitude; estrogen-dominant states produce higher frequency and lower amplitude.']
      ],'Long loop = target-gland hormone acts on hypothalamus and pituitary. Short loop = pituitary hormone acts on hypothalamus.',{
        caption:'Feedback patterns',headers:['Pattern','Example','Targets / result'],rows:[
          ['Long-loop','CRH → ACTH → cortisol','Cortisol inhibits CRH and ACTH'],['Short-loop','ACTH →| CRH','Pituitary signal inhibits hypothalamic release'],['Pulsatile secretion','FSH / LH pulses','Frequency and amplitude vary with ovarian hormonal state']
        ]}),
      section('9. Growth hormone deficiency: pituitary dwarfism',[8,9],'Pituitary dwarfism results from insufficient GH due to pituitary damage or abnormal development. Other pituitary hormones may also be deficient, producing panhypopituitarism.',[
        ['Typical dogs','It is classically described in German Shepherd dogs around 2–6 months old and is inherited as an autosomal-recessive trait associated with a cystic Rathke’s pouch. Other reported breeds include Carnelian bear dogs, Spitz-type dogs, Toy Pinschers, and Weimaraners.'],
        ['Early signs','Slow growth, proportionate dwarfism, developmental delay or mental retardation, and difficulty with house training.'],
        ['Physical signs','Retained puppy hair coat, hypotonic skin, truncal alopecia, hyperpigmentation, infantile genitalia, and delayed dental eruption.'],
        ['Laboratory findings','Possible eosinophilia, lymphocytosis, mild normocytic normochromic anemia, hypophosphatemia, and sometimes hypoglycemia from secondary adrenal insufficiency when ACTH is deficient.'],
        ['Differentials','Hypothyroid dwarfism, portosystemic shunt, diabetes mellitus, hyperadrenocorticism, malnutrition, and parasitism can also cause stunted growth.'],
        ['Diagnosis','Serum GH and IGF-1 may be measured. IGF-1 is more stable and not species-specific; GH assays for dogs and cats are often unavailable. Subnormal TSH and ACTH responses can suggest multiple pituitary deficiencies.']
      ],'Young, proportionate, slow growth plus retained puppy coat should prompt assessment of the GH axis.'),
      section('10. Acromegaly / hypersomatotropism',[9,10,11],'Acromegaly is chronic excessive GH secretion in an adult. It contrasts with juvenile GH deficiency and is strongly associated with insulin resistance.',[
        ['Causes by species','In dogs it is rare and usually associated with progestational drugs given to intact females for estrus suppression; mammary tissue is stimulated to produce excess GH. In cats it is usually caused by a slowly growing GH-secreting anterior-pituitary tumor, especially in older males around 8–14 years.'],
        ['Initial clues','Polyuria, polydipsia, and polyphagia may resemble poorly controlled diabetes mellitus, but weight gain or increased lean body mass despite uncontrolled diabetes is a major clue.'],
        ['Growth changes','Renomegaly, hepatomegaly, endocrine-organ enlargement, larger paws, jaw, tongue, forehead, or skull, and increased muscle mass can occur.'],
        ['Later complications','Cardiomegaly, systolic murmurs, congestive heart failure, and azotemia may develop; approximately half of acromegalic cats may eventually develop azotemia. Neurologic signs common in human acromegaly are generally not typical in small animals.'],
        ['Diabetes mechanism','GH increases insulin resistance and impairs glucose tolerance. Insulin concentrations can be very high and ketosis is uncommon. Suspect acromegaly in a diabetic cat, especially a male, with extreme insulin resistance.'],
        ['Diagnosis','IGF-1 is practical because it is stable and not species-specific. In cats, increased IGF-1 plus CT or MRI of the pituitary region is the most definitive approach discussed. Exclude other insulin-resistance causes such as hyperthyroidism and hyperadrenocorticism. Around 30% of diabetic cats that fail remission with an ultra-low-carbohydrate diet and insulin may be acromegalic.']
      ],'GH deficiency harms growth early; GH excess in adults causes tissue growth and severe insulin resistance.',{
        caption:'GH disorders in the unit',headers:['Feature','Pituitary dwarfism','Acromegaly / hypersomatotropism'],rows:[
          ['Timing','Juvenile','Adult'],['GH state','Deficient','Excessive'],['Signature pattern','Proportionate slow growth, retained puppy coat','Insulin-resistant diabetes plus acral / organ growth'],['Useful marker','IGF-1; other pituitary axes','IGF-1 plus imaging when indicated'],['Classic veterinary context','Young German Shepherd','Older male cat or progestational-drug exposure in dog']
        ]}),
      section('11. Lesson 2 high-yield chains',[1,11],'Use these chains after studying the complete notes and before beginning the flashcards.',[
        ['Posterior pituitary','Hypothalamic synthesis → axonal transport → posterior-pituitary release.'],
        ['ADH control','↑ osmolality or ↓ volume / pressure → ↑ ADH → renal water retention.'],
        ['DI','Central = ↓ ADH. Nephrogenic = kidney resistance. Both commonly cause PU/PD and dilute urine.'],
        ['Anterior pituitary','CRH → ACTH; GnRH → FSH/LH; TRH → TSH; GHRH → GH; somatostatin → ↓ GH; dopamine → ↓ PRL.'],
        ['Feedback','CRH → ACTH → cortisol; cortisol inhibits CRH and ACTH.'],
        ['GH disorders','Deficient juvenile GH → dwarfism. Excess adult GH → acromegaly and insulin resistance.']
      ],'If you can explain the direction of every arrow, you are ready to test yourself.')
    ],
    questions:[
      mc('Which structure forms the floor of the third ventricle?','Hypothalamus',['Pars distalis','Adrenal cortex','Thyroid follicle'],'The hypothalamus is part of the diencephalon and forms the third ventricle floor.',1),
      mc('The anterior pituitary develops from which embryonic structure?','Rathke’s pouch',['Neural crest of the adrenal medulla','Thyroid colloid','The posterior pituitary nerve terminals'],'Rathke’s pouch is an upward extension of oral ectoderm.',1),
      mc('Where are oxytocin and vasopressin synthesized?','Hypothalamic neuron cell bodies',['Posterior pituitary capillary cells','Anterior pituitary gonadotropes','Renal collecting tissue'],'Their cell bodies lie in hypothalamic nuclei; posterior pituitary terminals store and release the hormones.',2),
      mc('Which event directly triggers exocytosis from posterior pituitary terminals?','Calcium entry following depolarization',['Iodine attachment to tyrosine','A fall in thyroglobulin concentration','Cholesterol ester formation'],'Depolarization leads to calcium entry and secretory granule fusion.',2),
      mc('Which is the primary physiological action of ADH?','Promoting renal water retention',['Stimulating thyroid hormone synthesis','Producing milk in mammary cells','Increasing follicular LH receptors'],'Antidiuresis preserves body water.',3),
      mc('Which change normally increases ADH secretion?','Increased plasma osmolality',['Increased water relative to solute','Suppression of hypothalamic osmoreceptors','Expansion of blood volume alone'],'Higher osmolality activates the system that releases ADH to conserve water.',3),
      mc('What is the principal defect in nephrogenic DI?','The kidneys respond poorly to ADH',['The thyroid secretes excess T4','The pituitary produces excessive GH','Oxytocin cannot enter the bloodstream'],'Nephrogenic DI is target-organ resistance, rather than primary lack of ADH.',4),
      mc('Which hormone is produced by lactotropes?','Prolactin',['ACTH','TSH','Vasopressin'],'Lactotropes produce prolactin; somatotropes produce GH.',5),
      mc('Which subunit gives TSH, FSH, and LH their distinct biological specificity?','Beta subunit',['Shared alpha subunit','Neurophysin I','Cholesterol ring'],'These glycoproteins share an alpha subunit, while the beta subunit determines specificity.',6),
      mc('ACTH is derived from which precursor?','POMC',['Thyroglobulin','Preprooxyphysin','Albumin'],'POMC processing in corticotropes yields ACTH.',6),
      mc('Why is the hypophyseal portal system important?','It delivers hypothalamic signals directly to the anterior pituitary',['It stores oxytocin in thyroid follicles','It carries digestive enzymes into the intestine','It prevents all pituitary feedback'],'Direct portal delivery limits dilution of regulatory hormones in systemic circulation.',7),
      mc('Which hypothalamic signal inhibits GH secretion?','Somatostatin',['GHRH','GnRH','CRH'],'Somatostatin is also called GH-inhibiting hormone.',7),
      mc('Cortisol inhibition of both CRH and ACTH is an example of what?','Long-loop feedback',['Short-loop feedback','Autocrine exocytosis','Positive feedback'],'The target-gland hormone feeds back to hypothalamus and pituitary.',8),
      mc('Which pattern best fits pituitary dwarfism in the unit?','Proportionate slow growth with retained puppy coat',['Weight loss with marked thyroid excess','Isolated increased urine concentration','Sudden enlargement of the thyroid colloid'],'GH deficiency can cause proportionate dwarfism and retained juvenile coat.',9),
      mc('Which finding raises suspicion of acromegaly in a diabetic cat?','Severe insulin resistance with weight gain',['Insulin sensitivity with persistent weight loss','Low blood glucose without other changes','Complete absence of tissue growth'],'GH excess can cause insulin-resistant diabetes together with increased lean mass.',10),
      id('Give the alternative name for the pituitary gland.','Hypophysis',[],'The pituitary is also called the hypophysis.',1),
      id('Name the posterior pituitary hormone also called antidiuretic hormone.','Vasopressin',['ADH','arginine vasopressin','AVP'],'Vasopressin promotes renal water retention.',2),
      id('Which neurophysin is associated with oxytocin processing?','Neurophysin I',['neurophysin 1'],'Oxytocin is processed with neurophysin I; vasopressin with neurophysin II.',2),
      id('Name the DI type caused by insufficient ADH secretion.','Central diabetes insipidus',['central DI','central'],'Central DI reflects deficient circulating ADH.',3),
      id('What abbreviation names inappropriate ADH secretion without a suitable osmotic or volume stimulus?','SIADH',['syndrome of inappropriate antidiuretic hormone secretion'],'SIADH involves inappropriate vasopressin secretion.',5),
      id('Which anterior pituitary cells produce GH?','Somatotropes',['somatotrope','somatotrophs','somatotroph'],'Somatotropes produce growth hormone.',5),
      id('Name the hypothalamic catecholamine that inhibits prolactin.','Dopamine',['PIH','prolactin inhibiting hormone'],'Dopamine exerts inhibitory control over prolactin.',7),
      id('Which hypothalamic hormone stimulates both FSH and LH?','GnRH',['gonadotropin releasing hormone','gonadotrophin releasing hormone'],'GnRH stimulates gonadotropes.',7),
      id('Name the liver-derived growth factor stimulated by GH; an abbreviation is acceptable.','IGF-1',['IGF1','insulin like growth factor 1','somatomedin C'],'IGF-1 mediates GH-related growth and participates in feedback.',8),
      id('What term describes chronic GH excess producing acral growth changes in an adult?','Acromegaly',['hypersomatotropism'],'Acromegaly describes changes associated with chronic adult GH excess.',9),
      essay('Compare how the hypothalamus controls the anterior and posterior pituitary.','The anterior pituitary is glandular tissue derived from oral ectoderm. Hypothalamic regulatory hormones reach it through portal vessels and control its hormone secretion. The posterior pituitary is a neural extension: hypothalamic neurons synthesize oxytocin and ADH, transport granules down axons, and release them from nerve terminals when stimulated.',['Distinguish oral ectoderm from neural origin.','Explain portal hormone delivery to anterior pituitary cells.','Explain synthesis, axonal transport, and terminal release for the posterior pituitary.'],1),
      essay('Trace the negative-feedback response to an increase in plasma osmolality.','Higher plasma osmolality activates hypothalamic osmoreceptor signaling to vasopressin neurons. ADH is released from posterior pituitary terminals and promotes kidney water retention. Retaining water reduces the solute-to-water ratio toward normal, reducing the initial stimulus.',['Identify increased osmolality and hypothalamic sensing.','Connect ADH release to renal water conservation.','Explain how the response reverses the stimulus.'],3),
      essay('Distinguish central DI, nephrogenic DI, and primary polydipsia at a conceptual level.','Central DI is inadequate ADH secretion; nephrogenic DI is renal resistance to ADH. Both can produce large amounts of dilute urine and compensatory thirst. Primary polydipsia begins with excessive water intake and may lower plasma osmolality. ADH response testing helps distinguish deficiency from resistance; water deprivation requires veterinary supervision and exclusion of renal disease.',['Identify deficient secretion versus deficient renal response.','Explain excessive intake as the initiating problem in primary polydipsia.','Describe the testing principle and the safety limitation.'],4),
      essay('Use the CRH–ACTH–cortisol axis to distinguish long-loop and short-loop feedback.','CRH from the hypothalamus stimulates pituitary ACTH, which stimulates adrenal cortisol. In long-loop feedback, cortisol inhibits both hypothalamic CRH and pituitary ACTH. In short-loop feedback, pituitary ACTH inhibits hypothalamic CRH. Both reduce upstream drive rather than amplify it.',['Trace the forward axis correctly.','Identify cortisol as the long-loop signal and its two targets.','Identify ACTH feedback to the hypothalamus as short-loop.'],8),
      essay('Compare GH deficiency in a young dog with chronic GH excess in an adult cat.','GH deficiency can cause proportionate dwarfism, retained puppy coat, delayed dentition, and sometimes multiple pituitary hormone deficiencies. GH excess in an adult cat is often associated with a pituitary tumor, insulin resistance, organ enlargement, and acral growth. IGF-1 is useful for evaluating the GH axis; clinical context and imaging help interpret suspected excess.',['Describe juvenile deficiency and proportionate growth failure.','Describe adult excess, tissue growth, and insulin resistance.','Explain the role of IGF-1 and contextual assessment.'],9)
    ]
  },
  {
    id:3,title:'Small gland, wide-reaching effects',sourceTitle:'The thyroid gland',subtitle:'Explore thyroid hormone synthesis, metabolism, and the patterns that connect a gland’s activity to the whole animal.',pages:17,time:35,tags:['Thyroid','Metabolism','Veterinary patterns'],
    objectives:['Trace T3 and T4 synthesis, colloid storage, and release.','Explain transport, peripheral conversion, and feedback.','Compare canine hypothyroid and feline hyperthyroid patterns.'],
    sections:[
      section('1. Thyroid location and follicle structure',[1],'In most mammals the thyroid lies caudal to the trachea, commonly around the first or second tracheal ring. It is a major endocrine regulator of metabolism. Each follicle is a circle of follicular cells around a lumen filled with thick, homogeneous colloid.',[
        ['Follicular cells','Make thyroglobulin and thyroid hormones. Cuboidal cells suggest relatively basal activity; elongated cells indicate active stimulation and release.'],
        ['Colloid','The lumen contents are the major storage site for thyroid hormone. The stored hormone is outside the cells, attached to thyroglobulin.'],
        ['Parafollicular cells','C cells sit outside the follicles and produce calcitonin, which participates in calcium regulation.'],
        ['Memory rule','Follicular cells -> T3 and T4. C cells -> calcitonin.']
      ],'Follicle = cells + colloid. The colloid is an extracellular thyroid-hormone reserve.',{
        caption:'Thyroid structures and products',headers:['Structure','Main product or feature','Activity clue'],rows:[
          ['Follicular cell','Thyroglobulin, T3, and T4','Cuboidal = basal; elongated = actively releasing'],['Colloid / lumen','Extracellular storage of T3/T4 on thyroglobulin','Thick, homogeneous reserve'],['Parafollicular (C) cell','Calcitonin','Outside follicles; calcium regulation']
        ]}),
      section('2. Thyroid hormone synthesis: tyrosine, iodine, and TPO',[1,2],'Thyroid hormones are unusual because they are made from the amino acid tyrosine plus iodine, and much of the finished hormone is stored outside the cell.',[
        ['Thyroglobulin','Follicular cells synthesize this very large protein and secrete it into the follicular lumen. Its tyrosine residues provide the framework for hormone synthesis.'],
        ['Iodide uptake','Dietary iodine becomes iodide in the gastrointestinal tract. Follicular cells actively trap iodide; intracellular concentration can reach about 25-200 times the extracellular concentration.'],
        ['Organification','Iodide crosses the apical membrane toward colloid and is attached to thyroglobulin tyrosine. One iodine forms monoiodotyrosine (MIT); two form diiodotyrosine (DIT).'],
        ['Coupling','MIT + DIT -> T3 (triiodothyronine). DIT + DIT -> T4 (thyroxine / tetraiodothyronine).'],
        ['Thyroperoxidase','TPO works with hydrogen peroxide to attach iodine and support coupling. Thyroid hormones are the only hormones containing the halogen iodine.']
      ],'MIT has one iodine; DIT has two. MIT + DIT = T3, and DIT + DIT = T4.',{
        caption:'Synthesis reactions',headers:['Step','What happens','Product / result'],rows:[
          ['Iodide trapping','Follicular cell concentrates iodide from blood','Iodide available at colloid'],['Organification','TPO attaches iodine to thyroglobulin tyrosines','MIT or DIT'],['Coupling 1','MIT + DIT','T3 / triiodothyronine'],['Coupling 2','DIT + DIT','T4 / thyroxine']
        ]}),
      section('3. Colloid storage, release, and recycling',[2,3],'The thyroid stores a large reserve of hormone outside its cells. When release is needed, thyroglobulin returns to the follicular cell and is dismantled.',[
        ['Storage advantage','T3 and T4 stay attached to thyroglobulin in colloid. This extracellular reserve can support hormone supply during a period of iodine deficiency.'],
        ['Release sequence','Colloid thyroglobulin is endocytosed, the vesicle fuses with lysosomes, and lysosomal enzymes cleave thyroglobulin. T3 and T4 then cross the basal membrane into interstitial fluid and blood.'],
        ['Lipid solubility','Released T3 and T4 can cross the follicular-cell membrane because they are lipid-soluble.'],
        ['Iodine and tyrosine recovery','Iodotyrosine dehalogenase removes iodine from MIT and DIT. Iodide and tyrosine are recycled for new hormone synthesis.']
      ],'Colloid -> follicular cell -> lysosome -> T3/T4 into blood; MIT/DIT -> iodide + tyrosine recycled.'),
      section('4. T4, T3, and reverse T3: peripheral conversion',[2,3,4],'The gland itself secretes mostly T4. Peripheral tissues determine much of the active T3 available to the body.',[
        ['T4 output','The thyroid makes mostly T4 and only a small amount of T3.'],
        ['Active conversion','Liver and kidneys have high deiodinating-enzyme concentrations; skeletal muscle contributes a large total amount because it makes up so much body mass. 5-prime monodeiodinase removes iodine from the outer ring: T4 -> T3.'],
        ['Reverse T3','Inner-ring deiodination produces reverse T3 (rT3), which has little biological activity. The thyroid does not make rT3; it is formed in extrathyroidal tissues.'],
        ['Interpretation','Thyroid output and tissue conversion are separate steps. A change in conversion can alter activity even when T4 is the main gland product.']
      ],'Outer-ring deiodination activates T4 to T3. Inner-ring deiodination produces low-activity reverse T3.',{
        caption:'Peripheral conversion',headers:['Reaction','Iodine removed from','Biological result'],rows:[
          ['T4 -> T3','Outer ring','Active T3; mainly extrathyroidal'],['T4 -> reverse T3','Inner ring','Little biological activity; extrathyroidal']
        ]}),
      section('5. Transport in blood: free and protein-bound hormone',[3,4],'T3 and T4 are lipid-soluble and travel mainly attached to plasma proteins. The free fraction is small but biologically available.',[
        ['Thyroxine-binding globulin (TBG)','High affinity for T4 and also carries T3; low capacity because plasma concentration is low. TBG is found in domestic animals except cats.'],
        ['Albumin','Low affinity but high capacity because it is abundant. In cats, which lack TBG, albumin is especially important.'],
        ['Thyroxine-binding prealbumin','Specifically binds T4 with intermediate affinity and capacity. Prealbumin describes electrophoretic movement, not a precursor to albumin.'],
        ['Free fraction','Human free T4 is about 0.03% and free T3 about 0.3%. Dogs have somewhat larger fractions: slightly under 1% free T4 and slightly over 1% free T3.'],
        ['Equilibrium','Bound hormone is a transport and storage reservoir. Bound <-> free hormone continuously adjusts as tissues use the free fraction. Illness, drugs, binding-protein changes, and increased estrogen can shift this balance.']
      ],'Bound hormone is the reservoir; free hormone can leave plasma and act on target cells.',{
        caption:'Thyroid hormone carriers',headers:['Protein','Affinity','Capacity / species point'],rows:[
          ['TBG','High','Low; absent in cats'],['Albumin','Low','High; important in cats'],['Thyroxine-binding prealbumin','Intermediate','Intermediate; binds T4']
        ]}),
      section('6. Metabolism, excretion, and half-life',[4,5],'Deiodination is the main metabolic pathway. Conjugation and changes to the alanine portion provide additional inactivation routes.',[
        ['Deiodination','5-prime and 5-deiodinases remove iodine from the 3 or 5 position. Skeletal muscle, liver, and kidneys are important sites. T4 -> T3 is the major active exception; most other deiodinated products have little activity.'],
        ['Conjugation','Liver and kidneys attach sulfate or glucuronide groups. This is less common than deiodination.'],
        ['Other pathways','Transamination and decarboxylation change the alanine portion and contribute to breakdown.'],
        ['Excretion and recycling','Deiodinated and conjugated forms mostly leave in urine. Some hormone enters bile and feces; intestinal breakdown releases iodide that can return through the enterohepatic cycle. Humans recover iodide more efficiently than dogs through intrathyroidal and enterohepatic recycling.'],
        ['Half-life','In humans T3 lasts about 1 day and T4 about 6-7 days. Strong protein binding helps T4 last longer. In dogs and cats, T4 half-life is less than 24 hours.']
      ],'Protein binding and species differences matter when interpreting thyroid-hormone duration.',{
        caption:'Metabolism and duration',headers:['Topic','Key detail'],rows:[
          ['Main pathway','Deiodination'],['Other pathways','Sulfate/glucuronide conjugation; transamination; decarboxylation'],['Humans','T3 ~1 day; T4 ~6-7 days'],['Dogs and cats','T4 <24 hours'],['Excretion','Mostly urine; bile/feces also contribute; iodide can recycle']
        ]}),
      section('7. Actions of thyroid hormones',[5,6,7],'Thyroid hormones are the primary regulators of basal metabolic activity across nearly all tissues. They behave like lipid-soluble hormones: they cross membranes and act mainly through intracellular and nuclear receptors that affect mRNA transcription; receptors also occur on mitochondria.',[
        ['Calorigenic effect','They increase oxygen consumption and heat production, with mitochondria as an important site.'],
        ['Carbohydrates','They increase intestinal glucose absorption, help glucose enter muscle and fat, and increase responsiveness to insulin-mediated uptake. Small amounts can increase glycogen formation; higher amounts promote glycogenolysis.'],
        ['Proteins and growth','They work with GH, increase amino-acid uptake and protein-synthesis enzyme activity, and are essential for normal growth and development.'],
        ['Lipids','They increase lipolysis and cellular LDL uptake and breakdown. Deficiency reduces cholesterol clearance and commonly causes hypercholesterolemia. Excess activity is broadly catabolic, increasing use of stored nutrients.'],
        ['Nervous system','They are essential for fetal and neonatal CNS development. Low adult thyroid activity may cause mental dullness, lethargy, and reduced mental activity.'],
        ['Sympathetic and cardiovascular effects','They increase beta-adrenergic receptor number or activity, heart rate, contractile force, cardiac output, systolic pressure, and cardiac responsiveness to catecholamines. Diastolic pressure changes little.'],
        ['Development example','Thyroxine permits amphibian tadpole metamorphosis; after thyroidectomy a tadpole remains large and does not normally become a frog.']
      ],'Thyroid hormones coordinate metabolism, heat, growth, CNS function, sympathetic tone, and cardiovascular performance.',{
        caption:'Major actions by system',headers:['System','Principal effects'],rows:[
          ['Metabolic','Basal metabolism, oxygen use, heat production'],['Carbohydrate','Glucose absorption/uptake; glycogen formation at low levels, glycogenolysis at high levels'],['Protein and growth','Amino-acid uptake, protein synthesis, cooperation with GH'],['Lipid','Lipolysis, LDL uptake and breakdown, lower cholesterol'],['CNS','Fetal/neonatal development; adult alertness'],['Heart / sympathetic','Beta-adrenergic responsiveness, heart rate, contractility, systolic pressure']
        ]}),
      section('8. TSH regulation and negative feedback',[7,8],'TSH (thyrotropin) is the main regulator of the thyroid gland. TSH receptor activation uses cAMP and protein kinase signaling to stimulate synthesis, release, and thyroid growth.',[
        ['Low hormone state','Low T3/T4 means less negative feedback -> increased hypothalamic TRH -> increased pituitary TSH -> thyroid stimulation -> increased T3/T4.'],
        ['High hormone state','High T3/T4 strengthens feedback -> decreased TRH -> decreased TSH -> reduced thyroid stimulation and production.'],
        ['Axis','Hypothalamus TRH -> anterior pituitary TSH -> thyroid T4 and T3. T3/T4 inhibit both upstream levels.']
      ],'TRH -> TSH -> thyroid hormone; T3/T4 feed back to TRH and TSH.',{
        caption:'Thyroid axis',headers:['Hormone state','Hypothalamus','Pituitary','Thyroid response'],rows:[
          ['Low T3/T4','TRH increases','TSH increases','Synthesis and release increase'],['High T3/T4','TRH decreases','TSH decreases','Stimulation and production decrease']
        ]}),
      section('9. Goiter, goitrogens, and antithyroid drugs',[8,9],'A goiter is thyroid enlargement, often a compensatory response when hormone synthesis is inadequate. Iodine deficiency and dietary or drug goitrogens can interrupt the pathway.',[
        ['Iodine deficiency','Low iodine -> low hormone synthesis -> increased thyroid stimulation -> gland enlargement. Iodized salt has reduced this problem in many areas.'],
        ['Goitrogenic plants','Cabbage, kale, rutabaga, turnip, and rapeseed contain progoitrin, converted in the gut to goitrin. Goitrin interferes with organic binding of iodine.'],
        ['Thiocyanate','Thiocyanates interfere with active iodide trapping. Extra iodine may partly overcome thiocyanate but is much less effective against goitrin.'],
        ['Antithyroid compounds','Thiocarbamides such as thiourea and thiouracil are potent examples. Sulfonamides, p-aminosalicylic acid, phenylbutazone, and chlorpromazine can also reduce thyroid-hormone production.']
      ],'Goitrin blocks organification; thiocyanate blocks iodide trapping; both can reduce hormone production.',{
        caption:'Goitrogens and their targets',headers:['Agent or source','Interferes with','Possible result'],rows:[
          ['Iodine deficiency','Substrate supply','Low T3/T4 and goiter'],['Goitrin from crucifers','Organic binding / organification','Low synthesis, goiter'],['Thiocyanate','Active iodide uptake','Low synthesis, goiter'],['Thiocarbamides and listed drugs','Thyroid-hormone synthesis','Reduced thyroid output']
        ]}),
      section('10. Canine hypothyroidism: causes, risk, and signs',[9,10,11],'Canine hypothyroidism is usually a slowly developing hypometabolic disease. Lymphocytic thyroiditis is the most common primary cause.',[
        ['Primary, secondary, tertiary','Primary = thyroid disease (lymphocytic thyroiditis, dysgenesis, dyshormonogenesis, T4 transport defects, goitrogens, rarely iodine deficiency). Secondary = pituitary tumors, radiation, or endogenous/exogenous glucocorticoids. Tertiary = hypothalamic tumors or congenital TRH/TRH-receptor defects.'],
        ['Risk pattern','Some high-risk breeds show signs at 2-3 years; lower-risk dogs often present around 4-6 years. Reported breeds include English Setters, Eurasiers, Spanish Water Dogs, Irish Red and White Setters, Dalmatians, Boxers, Shetland Sheepdogs, Tibetan Terriers, Kuvasz, German Wirehaired Pointers, and Rhodesian Ridgebacks.'],
        ['Common signs','Slow subtle onset, lethargy, obesity, symmetrical truncal or tail-head alopecia, thickened skin, dull dry hair, poor regrowth after clipping, and retained puppy coat. Myxedema is hydrophilic material in tissues.'],
        ['Other systems','Possible bradycardia, decreased contractility, atherosclerosis, myopathy, megaesophagus, neuropathy, facial nerve paralysis, vestibular or lower-motor-neuron disease, rare myxedema coma with severe hyponatremia, reproductive problems, corneal lipid deposits, constipation, and gastrointestinal signs.']
      ],'The classic pattern is lethargy + obesity + symmetrical alopecia + dry coat, but it is not diagnostic alone.',{
        caption:'Canine hypothyroidism patterns',headers:['Category','Details'],rows:[
          ['Most common primary cause','Lymphocytic thyroiditis'],['Primary site','Thyroid'],['Secondary site','Pituitary'],['Tertiary site','Hypothalamus'],['Classic signs','Lethargy, obesity, symmetrical alopecia, thick/dry coat, poor regrowth'],['Serious uncommon signs','Myxedema coma; neurologic, cardiovascular, reproductive findings']
        ]}),
      section('11. Canine laboratory findings and diagnosis',[10,11,12,13],'Diagnosis combines signalment, history, physical findings, clinicopathology, and thyroid tests. A low TT4 alone does not prove hypothyroidism.',[
        ['Clinicopathology','About 25-30% have mild normocytic, normochromic anemia, associated with reduced erythropoietin, marrow activity, serum iron, or iron-binding capacity. About 75% have hypercholesterolemia from reduced lipid clearance; about 30% have mild hyponatremia. CK may increase with hypothyroid myopathy.'],
        ['Factors that lower or shift T4','Age, breed, environmental or body temperature, diurnal rhythm, obesity, malnutrition, concurrent illness, and drugs. Sighthounds naturally have lower TT4/FT4; puppies may have TT4 2-5 times adult values.'],
        ['Euthyroid sick syndrome','Diabetes mellitus, chronic renal failure, hepatic insufficiency, and infection can lower TT4 and raise reverse T3 without primary thyroid failure. Anesthetics, phenobarbital, primidone, diazepam, trimethoprim-sulfa, quinidine, phenylbutazone, salicylates, and glucocorticoids can lower TT4.'],
        ['Useful tests','TT4, TT3, FT4, and endogenous canine TSH are interpreted together. FT4 by equilibrium dialysis is the preferred method discussed. Low FT4 plus high TSH strongly supports primary disease, but 20-30% of hypothyroid dogs can have normal TSH. TgAA identifies autoimmune thyroid pathology or hereditary risk but does not alone prove current deficiency.'],
        ['Limitations and approach','The old TSH-stimulation test cannot reliably separate early disease from euthyroid sick syndrome and cannot identify secondary or tertiary disease; bovine TSH is no longer commercially available. TRH stimulation, scintigraphy, and biopsy have expense, accuracy, or invasiveness limits. Practical approach: TT4 + TSH, then FT4 by equilibrium dialysis. All three abnormal supports disease; one abnormal result warrants reassessment in 3-6 months.']
      ],'Interpret the patient and the complete panel, especially when illness, breed, age, or drugs could lower TT4.',{
        caption:'Canine thyroid-test interpretation',headers:['Result or context','Interpretation'],rows:[
          ['Low TT4 alone','Insufficient; consider illness, drugs, age, breed, and euthyroid sick syndrome'],['Low FT4 + high TSH','Strongly supports primary hypothyroidism'],['Low FT4 + low TSH','Can fit secondary hypothyroidism'],['Normal TSH','Does not exclude disease; 20-30% of affected dogs may be normal'],['TT4 + TSH + FT4 all abnormal','Hypothyroidism is likely'],['Only one test abnormal','Do not diagnose immediately; reassess in 3-6 months']
        ]}),
      section('12. Feline hyperthyroidism: disease, exposures, and mechanism',[13,14,15],'Feline hyperthyroidism is the most common feline endocrinopathy. Adenomatous hyperplasia creates autonomous thyroid tissue, usually in middle-aged or older cats, without a major breed or sex predisposition.',[
        ['Dietary iodine and goitrogens','Commercial diets usually provide enough iodine. Acute iodine changes can alter FT4, but chronic variation is usually adapted to and is unlikely alone to explain disease. Goitrogens are a proposed pathway, not an established explanation.'],
        ['Soy isoflavones','Genistein and daidzein can occur in dry cat foods and may interfere with TPO or 5-prime deiodinase. In one study of 18 cats fed 400 mg/kg, TT4 and FT4 rose modestly while T3 did not; evidence remains inconsistent.'],
        ['Canned food and BADGE','Bisphenol-A-diglycidyl ether from easy-open can linings has been proposed as an exposure. Cats may detoxify some substances less efficiently through hepatic glucuronidation. Epidemiological association does not prove causation, and only a small proportion of commercial-food cats develop hyperthyroidism.'],
        ['Autonomous signaling','Normally TSH -> TSH receptor -> G protein -> cAMP -> hormone production and growth. Hyperplastic tissue may have activating TSH-receptor mutations, increased stimulatory G-proteins, or reduced inhibitory G-proteins. Feline disease does not appear to be caused by Graves-like stimulating antibodies.'],
        ['Environmental proposals','Indoor living, cat litter, pesticides/herbicides, flea products, and brominated flame retardants such as PBDEs have been investigated. Associations can reflect confounding; PBDE serum levels reported in cats were 10-400 times human levels, but this remains a proposed association.']
      ],'Feline hyperthyroidism is autonomous thyroid growth; proposed dietary and environmental associations remain evidence to interpret cautiously.'),
      section('13. Feline clinical findings and diagnosis',[14,15,16,17],'The typical cat is hypermetabolic: appetite and activity increase while body mass falls.',[
        ['Clinical signs','Polyphagia, weight loss, vomiting, diarrhea, polydipsia, polyuria, hyperactivity, tachycardia, pupillary dilation, and behavioral change. Long-standing disease may cause hypertrophic cardiomyopathy, high-output heart failure, cachexia, and death.'],
        ['Blood and urine','Erythrocytosis and a catecholamine-related stress leukogram may occur. BUN can increase while creatinine stays normal because increased GFR and muscle loss mask renal disease. Urine specific gravity is often decreased.'],
        ['Liver and cholesterol','ALT and AST increase in about 80-90% of hyperthyroid cats. Cholesterol may decrease because hepatic clearance rises.'],
        ['Testing','TT4 is the usual first test and an increased value strongly supports disease in a compatible cat. FT4 helps detect early or occult disease but should be interpreted with other findings.'],
        ['T3 suppression','In a normal cat, administered T3 suppresses TSH and lowers T4 by at least 50%. Autonomous hyperthyroid tissue does not suppress appropriately, so T4 fails to fall; this helps in borderline cases. Scintigraphy visualizes hyperfunctional tissue.']
      ],'Dog: low thyroid, slow metabolism, weight gain. Cat: high thyroid, fast metabolism, weight loss despite appetite.',{
        caption:'Canine versus feline thyroid disease',headers:['Feature','Canine hypothyroidism','Feline hyperthyroidism'],rows:[
          ['Hormone state','Low thyroid hormone','High thyroid hormone'],['Common cause','Lymphocytic thyroiditis','Adenomatous hyperplasia / autonomous tissue'],['Metabolic state','Hypometabolic','Hypermetabolic'],['Weight','Gain / obesity','Loss despite increased appetite'],['Heart rate','Bradycardia','Tachycardia'],['Cholesterol','Often increased','Often decreased'],['Screening','TT4 + TSH; FT4 by equilibrium dialysis','TT4; FT4, T3 suppression, or scintigraphy as needed']
        ]}),
      section('14. Lesson 3 high-yield chains',[1,17],'Use these chains to review the complete notes before attempting the flashcards and quiz.',[
        ['Synthesis','Iodide uptake -> TPO organification -> MIT/DIT -> MIT + DIT = T3; DIT + DIT = T4.'],
        ['Storage and release','T3/T4 on thyroglobulin in colloid -> endocytosis -> lysosome -> blood; MIT/DIT -> iodide + tyrosine recycling.'],
        ['Peripheral activity','Thyroid makes mostly T4 -> outer-ring deiodination -> active T3; inner-ring deiodination -> low-activity reverse T3.'],
        ['Transport','TBG high affinity/low capacity; albumin low affinity/high capacity; prealbumin intermediate; free fraction is biologically available.'],
        ['Axis','TRH -> TSH -> thyroid T3/T4; T3/T4 inhibit TRH and TSH.'],
        ['Dogs and cats','Dog: low hormone -> lethargy, obesity, alopecia, high cholesterol. Cat: high hormone -> polyphagia, weight loss, tachycardia, hyperactivity.']
      ],'If you can explain each arrow and each dog-versus-cat contrast, you have the core of Unit 3.')
    ],
    questions:[
      mc('Which thyroid cell produces calcitonin?','Parafollicular C cell',['Follicular cell','Pituitary thyrotrope','Hypothalamic magnocellular neuron'],'C cells produce calcitonin; follicular cells produce T3 and T4.',1),
      mc('Where is the main extracellular thyroid hormone reserve stored?','Colloid in the follicular lumen',['Posterior pituitary axons','Adrenal cortical granules','Circulating red blood cells'],'T3 and T4 remain attached to thyroglobulin in colloid.',2),
      mc('Which coupling reaction forms T4?','DIT + DIT',['MIT + MIT','MIT + DIT','Tyrosine + cholesterol'],'Two diiodotyrosine residues form T4.',1),
      mc('Which enzyme supports thyroid iodination and coupling?','Thyroperoxidase',['Adenylyl cyclase','Peptidase alone','Aromatase'],'TPO works with hydrogen peroxide during thyroid hormone synthesis.',2),
      mc('What releases T3 and T4 from internalized thyroglobulin?','Lysosomal degradation',['Ribosomal translation','Albumin binding','LDL receptor uptake'],'Thyroglobulin-containing vesicles fuse with lysosomes, whose enzymes release T3 and T4.',2),
      mc('Which hormone does the thyroid gland itself predominantly secrete?','T4',['T3','Reverse T3','ACTH'],'The gland secretes mostly T4, with much T3 formed in peripheral tissues.',2),
      mc('Outer-ring deiodination of T4 produces which molecule?','T3',['Reverse T3','Calcitonin','Thyroglobulin'],'Outer-ring deiodination yields biologically active T3.',3),
      mc('Which best describes reverse T3?','A product of inner-ring deiodination with little biological activity',['The most active thyroid hormone','The major pituitary tropic hormone','A calcium-regulating peptide from C cells'],'Inner-ring deiodination of T4 produces relatively inactive reverse T3.',3),
      mc('Why does protein-bound T4 tend to persist longer?','Binding protects it from rapid removal',['Binding increases its urinary solubility','Albumin converts it to ACTH','Binding eliminates the free fraction permanently'],'Plasma binding provides a reservoir and slows rapid degradation.',5),
      mc('What is the calorigenic effect of thyroid hormones?','Increased oxygen consumption and heat production',['Reduced iodine uptake only','Suppression of all protein turnover','Increased milk ejection'],'Thyroid hormones raise metabolic oxygen use and heat production.',5),
      mc('Which axis is in the correct order?','TRH → TSH → T3/T4',['TSH → CRH → cortisol','T3 → ACTH → oxytocin','GH → TRH → ADH'],'TRH stimulates pituitary TSH, which stimulates thyroid hormone production.',7),
      mc('Which synthesis step is inhibited by thiocyanate in the unit?','Iodide trapping',['Lysosomal cleavage of thyroglobulin','Conversion of cholesterol to pregnenolone','Oxytocin exocytosis'],'Thiocyanate interferes with thyroid iodide uptake.',9),
      mc('Which pattern is most consistent with canine hypothyroidism?','Lethargy, weight gain, and symmetrical alopecia',['Hyperactivity, weight loss, and tachycardia','Isolated water loss from absent ADH','Acral growth with marked GH excess'],'Canine hypothyroidism commonly produces a hypometabolic state and coat changes.',10),
      mc('What can be concluded from a low total T4 result alone in a sick dog?','Further contextual assessment is needed',['Primary hypothyroidism is proven','Pituitary failure is proven','Concurrent illness cannot affect the result'],'Illness, medication, and breed can lower TT4 without primary thyroid failure.',12),
      mc('Which pattern is characteristic of feline hyperthyroidism?','Weight loss despite increased appetite',['Proportionate dwarfism in a puppy','Weight gain with a retained puppy coat','Low metabolism with slow hair regrowth'],'Thyroid excess causes hypermetabolism, often with polyphagia and weight loss.',15),
      id('Name the large colloid protein on which thyroid hormones are formed and stored.','Thyroglobulin',['Tg'],'Thyroglobulin supplies tyrosine residues and holds stored hormone.',1),
      id('What abbreviation denotes monoiodotyrosine?','MIT',['monoiodotyrosine'],'MIT is a tyrosine residue containing one iodine.',1),
      id('Give the full name of T3.','Triiodothyronine',['tri iodothyronine'],'T3 contains three iodine atoms.',1),
      id('Give the common hormone name for T4.','Thyroxine',['tetraiodothyronine'],'T4 is thyroxine or tetraiodothyronine.',1),
      id('What process removes iodine from thyroid hormones?','Deiodination',[],'Deiodination can activate T4 to T3 or generate less active products.',4),
      id('Name the high-affinity thyroid carrier abbreviated TBG.','Thyroxine-binding globulin',['thyroxine binding globulin','thyroid binding globulin'],'TBG has high affinity and relatively low capacity.',3),
      id('What term describes an enlarged thyroid gland?','Goiter',['goitre'],'Goiter describes thyroid enlargement, not a single hormone-output state.',9),
      id('What term describes elevated blood cholesterol?','Hypercholesterolemia',['hypercholesterolaemia'],'Reduced cholesterol clearance can accompany thyroid deficiency.',11),
      id('Which FT4 measurement method is preferred in the unit?','Equilibrium dialysis',['free T4 by equilibrium dialysis','FT4 by equilibrium dialysis'],'Equilibrium dialysis is the preferred free T4 method discussed.',12),
      id('Name the common thyroid pathology underlying feline hyperthyroidism in the unit.','Adenomatous hyperplasia',['thyroid adenomatous hyperplasia','adenomatous thyroid hyperplasia'],'Autonomously functioning hyperplastic follicles commonly underlie feline disease.',13),
      essay('Trace thyroid hormone synthesis from iodide uptake through release into blood.','Follicular cells trap iodide and produce thyroglobulin. TPO supports iodination of its tyrosines to MIT and DIT; coupling forms T3 from MIT + DIT and T4 from DIT + DIT. Hormones remain stored on thyroglobulin in colloid. Internalized thyroglobulin is degraded in lysosomes, releasing T3/T4; iodide and tyrosine from MIT/DIT are recycled.',['Explain iodide trapping, thyroglobulin, and TPO.','State both coupling reactions and extracellular storage.','Explain internalization, lysosomal release, and recycling.'],1),
      essay('Explain how peripheral tissues change thyroid hormone activity after T4 leaves the gland.','The thyroid secretes mostly T4. Outer-ring deiodination in peripheral tissues produces active T3, while inner-ring deiodination forms relatively inactive reverse T3. Liver, kidneys, and muscle contribute to conversion. Thus, circulating gland output and tissue activation are distinct parts of thyroid hormone physiology.',['Identify predominantly T4 secretion.','Distinguish outer-ring T3 from inner-ring reverse T3.','Name contributing tissues and connect conversion to hormone activity.'],2),
      essay('Why should a low TT4 in a dog not be used alone to diagnose hypothyroidism?','TT4 can be reduced by nonthyroidal illness, drugs, and normal breed or age-related variation. Assessment combines history, examination, and laboratory context with TT4, FT4, and TSH. Low FT4 with elevated TSH supports primary disease, but some hypothyroid dogs have normal TSH, so no isolated result replaces contextual interpretation.',['Give nonthyroidal reasons for low TT4.','Describe clinical context plus combined thyroid testing.','Recognize the limitation of normal TSH in some affected dogs.'],12),
      essay('Compare the expected metabolic patterns of canine hypothyroidism and feline hyperthyroidism.','Canine hypothyroidism commonly causes reduced activity, weight gain, alopecia, and increased cholesterol. Feline hyperthyroidism commonly causes increased activity, weight loss despite appetite, tachycardia, and sometimes reduced cholesterol. These contrasting patterns reflect reduced versus increased metabolic and adrenergic effects of thyroid hormones.',['Describe the canine hypometabolic and coat pattern.','Describe the feline hypermetabolic and cardiovascular pattern.','Link the signs to hormone effects rather than relying on species alone.'],16),
      essay('Explain why apparently normal creatinine can be misleading in a hyperthyroid cat, and why an environmental association is not proof of a cause.','Hyperthyroidism increases GFR and can reduce muscle mass, which may mask kidney impairment in creatinine measurements. Renal findings therefore require context. Likewise, an exposure associated with hyperthyroidism in an observational study may reflect confounding factors; association alone does not establish that the exposure caused disease.',['Explain the increased-GFR effect on renal interpretation.','Recognize muscle loss and the need for clinical context.','Distinguish epidemiological association from demonstrated causation.'],15)
    ]
  }
];
for (const lesson of lessons) {
  lesson.questions.forEach((q,i)=>q.id=`u${lesson.id}-q${i+1}`);
  lesson.cards=lesson.questions.filter(q=>q.type!=='essay').map(q=>({id:q.id,front:q.prompt,back:q.answer,detail:q.explanation,page:q.page}));
}
