import {guideForLesson} from './study-notes.js';

const cell=value=>String(value??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');

export function studyMarkdown(lesson) {
  if(lesson.notesText!=null)return lesson.notesText;
  const guide=guideForLesson(lesson);
  return [
    `# ${guide.title||lesson.title}`,
    guide.subtitle,
    guide.objectives?.length?`## Learning objectives\n\n${guide.objectives.map(o=>`- ${o}`).join('\n')}`:'',
    ...guide.sections.map(section=>{
      const table=section.table;
      const diagram=section.diagram;
      const nodes=new Map(diagram?.nodes?.map(node=>[node.id,node.label])||[]);
      return [
        `## ${section.heading}`,
        `Sources: ${section.sources.join(', ')}`,
        section.summary,
        ...section.points.map(point=>`${point.term?`**${point.term}.** `:''}${point.explanation}`),
        table?`### ${table.caption}\n\n${[table.headers,table.headers.map(()=>'---'),...table.rows].map(row=>`| ${row.map(cell).join(' | ')} |`).join('\n')}`:'',
        diagram?`### ${diagram.caption}\n\n${diagram.edges.filter(edge=>nodes.has(edge.from)&&nodes.has(edge.to)).map(edge=>`- ${nodes.get(edge.from)} → ${nodes.get(edge.to)}${edge.label?` (${edge.label})`:''}`).join('\n')}`:'',
        section.takeaway?`**Remember:** ${section.takeaway}`:'',
      ].filter(Boolean).join('\n\n');
    }),
  ].filter(Boolean).join('\n\n');
}
