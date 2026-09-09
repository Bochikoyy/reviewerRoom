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
      section('A bridge between brain and body',[1],'The hypothalamus links nervous and endocrine control. It is part of the diencephalon and forms the floor of the third ventricle.',[
        ['Chemical control','Releasing and inhibitory signals coordinate pituitary secretion; the hypothalamus also regulates autonomic functions.'],
        ['Anterior pituitary','The adenohypophysis develops from oral ectoderm through Rathke’s pouch. The pars distalis is its main glandular portion.'],
        ['Posterior pituitary','The neurohypophysis develops from neural ectoderm and is an extension of the hypothalamus.'],
        ['Other regions','The notes also distinguish the pars intermedia and pars tuberalis.']
      ],'Anterior: glandular, oral ectoderm. Posterior: neural, hypothalamic extension.'),
      section('Posterior pituitary: made above, released below',[1,2],'Oxytocin and vasopressin are synthesized in hypothalamic magnocellular neurons, then transported to posterior pituitary nerve endings.',[
        ['Where synthesis happens','Both supraoptic and paraventricular nuclei contribute; avoid assigning each hormone exclusively to one nucleus.'],
        ['Processing','Oxytocin is associated with neurophysin I; vasopressin with neurophysin II during precursor processing.'],
        ['Axonal transport','Secretory granules travel down axons and are stored in nerve terminals.'],
        ['Release','An action potential reaches the terminal, calcium enters, and granules release hormone by exocytosis into blood.']
      ],'Hypothalamic synthesis → axonal transport → posterior pituitary storage and release'),
      section('Oxytocin and vasopressin',[2,3],'These hormones act directly on target tissues, but their physiological roles differ.',[
        ['Oxytocin','Contracts mammary myoepithelial cells for milk ejection and uterine myometrium for contraction.'],
        ['Vasopressin / ADH','Its primary role is antidiuresis: promoting renal water retention. It also has a vascular smooth-muscle pressor effect.'],
        ['Species names','Most species use arginine vasopressin; pigs have lysine vasopressin; birds have arginine vasotocin.'],
        ['Release signals','Increased plasma osmolality, decreased blood volume, or decreased blood pressure stimulate vasopressin release.']
      ],'Higher osmolality → more ADH → more water retained → osmolality moves toward normal.'),
      section('When water regulation goes wrong',[3,4,5],'Diabetes insipidus (DI) involves failure to conserve water because ADH is deficient or the kidneys fail to respond.',[
        ['Central DI','Insufficient ADH secretion. Typical study findings include polyuria, polydipsia, and persistently dilute urine.'],
        ['Nephrogenic DI','The kidney fails to respond appropriately despite the presence of ADH.'],
        ['Primary polydipsia','Excessive drinking can dilute plasma, contrasting with the tendency toward dehydration and higher osmolality in DI.'],
        ['Testing principle','An ADH response helps distinguish hormone deficiency from renal resistance. Water deprivation is a supervised veterinary diagnostic procedure; renal failure and other causes of PU/PD must first be excluded.'],
        ['SIADH','ADH is released without an appropriate osmotic or volume stimulus. The unit discusses associations with ectopic neoplasia.']
      ],'Central DI = insufficient signal. Nephrogenic DI = insufficient target response.'),
      section('Meet the anterior pituitary hormones',[5,6],'Each hormone is associated with a characteristic pituitary cell type and target function.',[
        ['GH & PRL','Somatotropes produce growth hormone; lactotropes produce prolactin. These related protein hormones are called somatomammotropins.'],
        ['TSH, FSH & LH','Thyrotropes produce TSH; gonadotropes produce FSH and LH. Their glycoprotein structure has a common alpha subunit and a beta subunit that confers specificity.'],
        ['ACTH','Corticotropes process POMC to produce ACTH, which stimulates the adrenal cortex.'],
        ['POMC products','Processing differs by pituitary region. The pars intermedia produces alpha-MSH; related processing also yields beta-endorphins.'],
        ['GH and the liver','GH stimulates IGF-1 production, giving it an indirect, tropic role as well as direct effects.']
      ],'Somatotrope → GH · Lactotrope → PRL · Thyrotrope → TSH · Gonadotrope → FSH/LH · Corticotrope → ACTH'),
      section('Portal vessels and hypothalamic signals',[7,8],'The hypophyseal portal system carries hypothalamic regulatory hormones directly to the anterior pituitary without first diluting them throughout systemic blood.',[
        ['Route','Median eminence capillaries → portal veins → pars distalis capillary network.'],
        ['Releasing signals','CRH stimulates ACTH; GnRH stimulates FSH and LH; TRH stimulates TSH; GHRH stimulates GH.'],
        ['Inhibitory signals','Somatostatin inhibits GH. Dopamine inhibits prolactin and is a catecholamine rather than a peptide.'],
        ['Long-loop feedback','A target-gland hormone inhibits upstream control: cortisol inhibits CRH and ACTH.'],
        ['Short-loop feedback','A pituitary hormone feeds back to the hypothalamus, such as ACTH inhibition of CRH. Gonadotropin secretion remains pulsatile.']
      ],'CRH → ACTH → cortisol; cortisol feeds back to the hypothalamus and pituitary.'),
      section('Too little GH: pituitary dwarfism',[8,9],'Insufficient pituitary GH can cause proportionate dwarfism. Multiple hormone deficiencies may coexist in panhypopituitarism.',[
        ['Typical presentation','Young German Shepherd dogs are a classic example in the unit. Slow growth may be accompanied by retained puppy coat and delayed dental eruption.'],
        ['Other signs','Truncal alopecia, hyperpigmentation, and immature genitalia can occur.'],
        ['Broader assessment','Other causes of poor growth include hypothyroidism, nutritional problems, parasitism, and portosystemic shunts.'],
        ['IGF-1','IGF-1 is a more stable marker of the GH axis than a single pulsatile GH measurement. Other pituitary axes may also need assessment.']
      ],'Proportionate poor growth + retained puppy coat → recall the GH axis.'),
      section('Too much GH: hypersomatotropism',[9,10,11],'Chronic GH excess in an adult produces acromegalic changes and often marked insulin resistance.',[
        ['Species contrast','The unit associates feline disease with GH-secreting pituitary tumors and canine disease with progestational stimulation of mammary GH.'],
        ['A useful pattern','Poorly controlled diabetes accompanied by weight gain or increased lean mass raises suspicion of GH excess.'],
        ['Physical changes','Organ enlargement and enlarged paws, jaw, tongue, or skull may occur.'],
        ['Evaluation','IGF-1 and pituitary imaging support assessment in cats. Other causes of insulin resistance must also be considered.']
      ],'GH excess → insulin resistance + tissue growth; IGF-1 helps assess the axis.')
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
      section('Inside a thyroid follicle',[1,2],'A thyroid follicle is a ring of follicular cells surrounding a lumen filled with colloid. The colloid provides an unusual extracellular hormone reserve.',[
        ['Follicular cells','Produce thyroglobulin and the thyroid hormones T3 and T4.'],
        ['Parafollicular cells','C cells produce calcitonin, which participates in calcium regulation.'],
        ['Thyroglobulin','This large protein provides tyrosine residues used to build thyroid hormones. It is secreted into the follicular lumen.'],
        ['Storage','T3 and T4 remain attached to thyroglobulin within the colloid until they are released.']
      ],'Follicular cells → T3/T4. C cells → calcitonin. Colloid → hormone reserve.'),
      section('Building T3 and T4',[1,2],'Iodine and tyrosine come together on thyroglobulin. Iodination and coupling form the thyroid hormones.',[
        ['Iodide trapping','Follicular cells actively concentrate iodide from the circulation and transfer it toward the colloid.'],
        ['Organification','Iodine is attached to tyrosine residues: one iodine forms MIT, two form DIT.'],
        ['Coupling','MIT + DIT forms T3. DIT + DIT forms T4.'],
        ['The key enzyme','Thyroperoxidase (TPO), working with hydrogen peroxide, supports iodination and coupling.'],
        ['Release and recycling','Thyroglobulin is taken back into cells and degraded in lysosomes. T3/T4 enter blood; iodine and tyrosine from MIT/DIT are recycled.']
      ],'Iodide uptake → MIT/DIT → coupling → colloid storage → lysosomal release'),
      section('Conversion and circulating carriers',[2,3,4],'The thyroid secretes mostly T4. Peripheral conversion supplies much of the body’s active T3.',[
        ['Outer-ring deiodination','Removal of an outer-ring iodine converts T4 into active T3. Liver, kidney, and muscle contribute.'],
        ['Inner-ring deiodination','This produces reverse T3, which has little biological activity compared with T3.'],
        ['Plasma transport','Most circulating thyroid hormone is bound to proteins. The free fraction is available to target tissues.'],
        ['Carrier contrast','TBG has high affinity and low capacity. Albumin has low affinity and high capacity; the notes emphasize its importance in cats.'],
        ['Dynamic balance','Illness, drugs, and changing binding proteins can shift free/bound relationships and complicate interpretation of total values.']
      ],'The thyroid mainly supplies T4; peripheral tissues help determine active T3 availability.'),
      section('Metabolism and duration',[4,5],'Deiodination is the major metabolic pathway. Conjugation with sulfates and glucuronides provides additional routes.',[
        ['An active conversion','T4 → T3 is the major reminder that removing iodine does not always inactivate a hormone.'],
        ['Elimination','Metabolites are eliminated in urine; biliary and intestinal handling also participate in iodine recycling.'],
        ['Protein binding','Stronger plasma binding helps protect hormone from rapid clearance.'],
        ['Species matter','The unit contrasts human T4 persistence of about 6–7 days with a T4 half-life below 24 hours in dogs and cats. Do not transfer human time scales directly to veterinary species.']
      ],'Binding and species differences influence how long a hormone remains in circulation.'),
      section('What thyroid hormones do',[5,6,7],'Thyroid hormones regulate basal metabolic activity and support growth, development, and normal nervous-system function.',[
        ['Cellular action','Intracellular receptors influence gene transcription and the production of proteins.'],
        ['Calorigenic effect','Oxygen consumption and heat production increase.'],
        ['Nutrient metabolism','Thyroid hormones influence glucose handling, protein turnover, and lipolysis. Excess hormone favors increased nutrient use.'],
        ['Cholesterol','Thyroid hormones promote cholesterol clearance; deficiency can contribute to hypercholesterolemia.'],
        ['Growth and sympathetic effects','They cooperate with GH and support fetal/neonatal nervous-system development. Increased beta-adrenergic responsiveness contributes to stronger cardiac and sympathetic effects.']
      ],'Think metabolism, heat, growth, brain development, and adrenergic responsiveness.'),
      section('Feedback and goitrogens',[7,8,9],'The hypothalamic–pituitary–thyroid axis adjusts thyroid stimulation through negative feedback.',[
        ['The axis','Hypothalamic TRH → anterior pituitary TSH → thyroid T3/T4. Thyroid hormones reduce upstream stimulation.'],
        ['TSH action','TSH supports thyroid hormone production and thyroid tissue growth.'],
        ['Goiter','Impaired hormone synthesis can increase compensatory stimulation and enlarge the thyroid. Enlargement alone does not specify hormone output.'],
        ['Goitrogen contrast','The unit describes goitrin as interfering with organification and thiocyanate as interfering with iodide trapping.']
      ],'TRH → TSH → T3/T4; thyroid hormone feeds back to reduce stimulation.'),
      section('Canine hypothyroidism',[9,10,11,12,13],'A hypometabolic pattern can include lethargy, weight gain, and characteristic coat changes. These findings guide assessment but are not diagnostic by themselves.',[
        ['Level of the problem','Primary disease is in the thyroid, secondary in the pituitary, tertiary in the hypothalamus. The unit emphasizes lymphocytic thyroiditis as a primary cause.'],
        ['Typical pattern','Lethargy, obesity, symmetrical alopecia, dry coat, and poor hair regrowth. Hypercholesterolemia and mild anemia may be present.'],
        ['Low TT4 is not enough','Breed, age, concurrent illness, and medications affect thyroid measurements. Euthyroid sick syndrome can lower TT4 without primary thyroid failure.'],
        ['Interpreting a panel','TT4, free T4, and endogenous TSH are considered together with clinical context. Equilibrium dialysis is the preferred FT4 method discussed in the unit.'],
        ['TSH limitation','Some hypothyroid dogs have normal TSH. TgAA supports evidence of autoimmune thyroid pathology but does not alone establish current hormone deficiency.']
      ],'Low TT4 alone does not prove hypothyroidism: interpret the patient and the panel.'),
      section('Feline hyperthyroidism',[13,14,15,16,17],'The contrasting hypermetabolic pattern is weight loss despite increased appetite, often with hyperactivity and tachycardia.',[
        ['Common pathology','The unit describes adenomatous hyperplasia and autonomous thyroid follicular activity, usually in middle-aged or older cats.'],
        ['Clinical pattern','Polyphagia, weight loss, increased activity, tachycardia, vomiting or diarrhea, and PU/PD can occur.'],
        ['Renal interpretation','Increased GFR and loss of muscle mass can mask underlying kidney disease, so apparently normal creatinine requires context.'],
        ['Testing','TT4 is the usual initial test. FT4 and other investigations can help in equivocal cases but require clinical interpretation.'],
        ['Evidence matters','Dietary and environmental exposures discussed in the PDF are proposed associations, not established proof of causation.']
      ],'Dog: slow, weight gain, low thyroid. Cat: fast, weight loss, high thyroid.')
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
