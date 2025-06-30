
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const gradeSchema = z.object({
  studentId: z.number().min(1, 'Veuillez sélectionner un étudiant'),
  subject: z.string().min(1, 'Veuillez indiquer la matière'),
  grade: z.number().min(0).max(20, 'La note doit être entre 0 et 20'),
  coefficient: z.number().min(1).max(5, 'Le coefficient doit être entre 1 et 5'),
  teacher: z.string().min(1, 'Veuillez sélectionner un formateur'),
});

type GradeFormData = z.infer<typeof gradeSchema>;

interface AddGradeFormProps {
  open: boolean;
  onClose: () => void;
}

export const AddGradeForm = ({ open, onClose }: AddGradeFormProps) => {
  const { addGrade, students, teachers } = useApp();
  
  const form = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      studentId: 0,
      subject: '',
      grade: 0,
      coefficient: 1,
      teacher: '',
    },
  });

  const onSubmit = (data: GradeFormData) => {
    const student = students.find(s => s.id === data.studentId);
    if (!student) return;

    addGrade({
      ...data,
      studentName: student.name,
      course: student.course,
      date: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: 'Succès',
      description: 'Note ajoutée avec succès',
    });
    
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une note</DialogTitle>
          <DialogDescription>
            Saisir une nouvelle note pour un étudiant
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Étudiant</Label>
            <Select onValueChange={(value) => form.setValue('studentId', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un étudiant" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name} - {student.course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.studentId && (
              <p className="text-sm text-red-600">Veuillez sélectionner un étudiant</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Matière</Label>
            <Input
              id="subject"
              {...form.register('subject')}
              placeholder="Ex: HTML/CSS, JavaScript..."
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-red-600">{form.formState.errors.subject.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Note (/20)</Label>
              <Input
                id="grade"
                type="number"
                min="0"
                max="20"
                step="0.5"
                {...form.register('grade', { valueAsNumber: true })}
                placeholder="15.5"
              />
              {form.formState.errors.grade && (
                <p className="text-sm text-red-600">{form.formState.errors.grade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coefficient">Coefficient</Label>
              <Input
                id="coefficient"
                type="number"
                min="1"
                max="5"
                {...form.register('coefficient', { valueAsNumber: true })}
                placeholder="2"
              />
              {form.formState.errors.coefficient && (
                <p className="text-sm text-red-600">{form.formState.errors.coefficient.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Formateur</Label>
            <Select onValueChange={(value) => form.setValue('teacher', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un formateur" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.teacher && (
              <p className="text-sm text-red-600">{form.formState.errors.teacher.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
