import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getUserProfile, updateUserProfile } from "@/lib/localStorage";
import { skills } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Calendar,
  MapPin,
  Building,
  Mail,
  Phone,
  User,
  FileText,
  Briefcase,
  School,
  BookOpen,
  Languages,
  Github,
  Linkedin,
  Code,
  Plus,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skill, UserProfile } from "@/lib/types";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    const loadProfile = () => {
      try {
        setIsLoading(true);
        const profile = getUserProfile();
        setUserProfile(profile);
        setEditedBio(profile.bio || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil");
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Função para calcular a completude do perfil
  const calculateProfileCompleteness = () => {
    if (!userProfile) return 0;

    let total = 0;
    let filled = 0;

    // Dados pessoais
    const personalFields = [
      "name",
      "avatar",
      "email",
      "phone",
      "location",
      "bio",
    ];
    total += personalFields.length;
    personalFields.forEach((field) => {
      if (userProfile[field as keyof typeof userProfile]) filled++;
    });

    // Educação
    const educationFields = ["education"];
    total += educationFields.length;
    if (userProfile.education && userProfile.education.length > 0) filled++;

    // Experiência
    const experienceFields = ["experience"];
    total += experienceFields.length;
    if (userProfile.experience && userProfile.experience.length > 0) filled++;

    // Habilidades
    const skillsFields = ["skills"];
    total += skillsFields.length;
    if (userProfile.skills && userProfile.skills.length > 0) filled++;

    // Calcula a porcentagem
    return Math.round((filled / total) * 100);
  };

  const profileCompleteness = userProfile ? calculateProfileCompleteness() : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const saveBio = () => {
    if (!userProfile) return;

    try {
      const updatedProfile = { ...userProfile, bio: editedBio };
      updateUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
      setIsEditingBio(false);
      toast.success("Biografia atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar biografia:", error);
      toast.error("Erro ao salvar biografia");
    }
  };

  const handlePersonalInfoSave = (data: any) => {
    if (!userProfile) return;

    try {
      const updatedProfile = {
        ...userProfile,
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
      };

      updateUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
      toast.success("Informações pessoais atualizadas com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar informações pessoais:", error);
      toast.error("Erro ao salvar informações pessoais");
      return false;
    }
  };

  const addNewSkill = (skillId: string) => {
    if (!userProfile) return;

    try {
      const selectedSkill = skills.find((s) => s.id === skillId);
      if (!selectedSkill) return;

      // Verificar se a skill já existe no perfil
      if (userProfile.skills.some((s) => s.id === skillId)) {
        toast.error("Esta habilidade já está no seu perfil");
        return;
      }

      const updatedProfile = {
        ...userProfile,
        skills: [...userProfile.skills, selectedSkill],
      };

      updateUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
      toast.success("Habilidade adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar habilidade:", error);
      toast.error("Erro ao adicionar habilidade");
    }
  };

  const removeSkill = (skillId: string) => {
    if (!userProfile) return;

    try {
      const updatedProfile = {
        ...userProfile,
        skills: userProfile.skills.filter((s) => s.id !== skillId),
      };

      updateUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
      toast.success("Habilidade removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover habilidade:", error);
      toast.error("Erro ao remover habilidade");
    }
  };

  if (isLoading || !userProfile) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p>Carregando dados do perfil...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de perfil */}
        <div className="lg:col-span-1">
          <Card className="border-conecta-blue/10 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-conecta-blue to-conecta-darkblue"></div>

            <CardContent className="pt-0 relative px-6 pb-6">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24 -mt-12 border-4 border-white">
                  <AvatarImage
                    src={userProfile.avatar}
                    alt={userProfile.name}
                  />
                  <AvatarFallback className="bg-conecta-blue text-white text-xl">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-gray-600">Estudante</p>

                <div className="mt-4 flex justify-center space-x-2">
                  <EditProfileDialog
                    userProfile={userProfile}
                    onSave={handlePersonalInfoSave}
                  />
                </div>

                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-gray-600 text-sm">
                        {userProfile.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <p className="text-gray-600 text-sm">
                        {userProfile.phone || "Não informado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Localização</p>
                      <p className="text-gray-600 text-sm">
                        {userProfile.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Github className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">GitHub</p>
                      <a
                        href="https://github.com/joaosilva"
                        className="text-conecta-blue text-sm hover:underline"
                      >
                        github.com/joaosilva
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Linkedin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">LinkedIn</p>
                      <a
                        href="https://linkedin.com/in/joaosilva"
                        className="text-conecta-blue text-sm hover:underline"
                      >
                        linkedin.com/in/joaosilva
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Completude do perfil</span>
                  <span className="font-medium">{profileCompleteness}%</span>
                </div>
                <Progress value={profileCompleteness} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-conecta-blue/10 mt-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Minhas Skills</h3>
                <AddSkillDialog
                  onAddSkill={(addSkill) => addNewSkill(addSkill)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className={`
                      py-1.5 px-2.5 group relative
                      ${
                        skill.category === "frontend"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : ""
                      }
                      ${
                        skill.category === "backend"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : ""
                      }
                      ${
                        skill.category === "database"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : ""
                      }
                      ${
                        skill.category === "other"
                          ? "bg-gray-50 text-gray-700 border-gray-200"
                          : ""
                      }
                    `}
                  >
                    {skill.name}
                    <button
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeSkill(skill.id)}
                      title="Remover skill"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna de conteúdo principal */}
        <div className="lg:col-span-2">
          <Card className="border-conecta-blue/10">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="personal">Sobre Mim</TabsTrigger>
                  <TabsTrigger value="education">Educação</TabsTrigger>
                  <TabsTrigger value="experience">Experiência</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-0">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">Biografia</h3>
                    {isEditingBio ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingBio(false)}
                        >
                          <X size={14} className="mr-1" /> Cancelar
                        </Button>
                        <Button variant="default" size="sm" onClick={saveBio}>
                          <Save size={14} className="mr-1" /> Salvar
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingBio(true)}
                      >
                        <Pencil size={14} className="mr-1" /> Editar
                      </Button>
                    )}
                  </div>

                  {isEditingBio ? (
                    <Textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Escreva uma breve descrição sobre você..."
                      className="w-full"
                      rows={5}
                    />
                  ) : (
                    <p className="text-gray-600">{userProfile.bio}</p>
                  )}
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">
                      Formação Acadêmica
                    </h3>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus size={14} /> Adicionar
                    </Button>
                  </div>

                  {userProfile.education &&
                    userProfile.education.map((edu, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-conecta-blue/10 rounded-md flex items-center justify-center">
                              <School className="h-5 w-5 text-conecta-blue" />
                            </div>
                            <div>
                              <h4 className="font-medium">{edu.degree}</h4>
                              <p className="text-gray-600">{edu.institution}</p>
                              <p className="text-sm text-gray-500">
                                {formatDate(edu.startDate)} -{" "}
                                {edu.endDate
                                  ? formatDate(edu.endDate)
                                  : "Presente"}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Pencil size={16} />
                          </Button>
                        </div>

                        {index < (userProfile.education?.length || 0) - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">
                      Experiência Profissional
                    </h3>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus size={14} /> Adicionar
                    </Button>
                  </div>

                  {userProfile.experience &&
                  userProfile.experience.length > 0 ? (
                    userProfile.experience.map((exp, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-conecta-blue/10 rounded-md flex items-center justify-center">
                              <Building className="h-5 w-5 text-conecta-blue" />
                            </div>
                            <div>
                              <h4 className="font-medium">{exp.role}</h4>
                              <p className="text-gray-600">{exp.company}</p>
                              <p className="text-sm text-gray-500">
                                {formatDate(exp.startDate)} -{" "}
                                {exp.endDate
                                  ? formatDate(exp.endDate)
                                  : "Presente"}
                              </p>
                              <p className="text-sm text-gray-600 mt-2">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Pencil size={16} />
                          </Button>
                        </div>

                        {index < (userProfile.experience?.length || 0) - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="text-lg font-medium mb-1">
                        Nenhuma experiência adicionada
                      </h4>
                      <p className="text-gray-500 mb-4">
                        Adicione suas experiências profissionais para aumentar
                        suas chances
                      </p>
                      <Button variant="outline" className="gap-1">
                        <Plus size={14} /> Adicionar Experiência
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Componente de Dialog para editar informações pessoais
const EditProfileDialog = ({
  userProfile,
  onSave,
}: {
  userProfile: UserProfile;
  onSave: (data: any) => boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    defaultValues: {
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone || "",
      location: userProfile.location || "",
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSaving(true);
      const success = onSave(data);
      if (success) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1">
          <Edit size={14} /> Editar Perfil
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Informações Pessoais</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...form.register("name")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                {...form.register("email")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                {...form.register("phone")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Localização
              </Label>
              <Input
                id="location"
                className="col-span-3"
                {...form.register("location")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Componente de Dialog para adicionar skills
const AddSkillDialog = ({
  onAddSkill,
}: {
  onAddSkill: (skillId: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleAddSkill = () => {
    if (selectedSkill) {
      onAddSkill(selectedSkill);
      setSelectedSkill("");
      setOpen(false);
    }
  };

  // Agrupar skills por categoria
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryNames: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    devops: "DevOps",
    soft: "Soft Skills",
    other: "Outras",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Habilidade</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <Label htmlFor="skill">Selecione uma habilidade</Label>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Selecione uma habilidade" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(skillsByCategory).map(
                  ([category, categorySkills]) => (
                    <SelectGroup key={category}>
                      <SelectItem value={category} disabled>
                        {categoryNames[category] || category}
                      </SelectItem>
                      {categorySkills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleAddSkill}
            disabled={!selectedSkill}
          >
            Adicionar Habilidade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
